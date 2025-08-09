from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import UploadFile, File
from fastapi.responses import StreamingResponse, Response , JSONResponse
from minio.error import S3Error
from app.services.minio.client import minioClient, profile_picture_bucket
from app.services.db.database import get_db
from app.models.user import User
from sqlalchemy.orm import Session
import io
import os
# from sqlalchemy.orm import Session
# from app.services.db.database import get_db
# from app.services.db.models.user import User


profile_router = APIRouter(prefix="/profile")


@profile_router.get("/picture")
async def get_profile_picture(user_id: int, 
                              db: Session = Depends(get_db)):
    print("Here in the get profile picture")
    try:
        # --- MINIMAL MODIFICATION 1: Get the User object (renamed from profile_picture_url) ---
        user_db = db.query(User).filter(User.id == user_id).first()
        
        if not user_db:
            # --- MINIMAL MODIFICATION 2: Use HTTPException for proper FastAPI errors ---
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

        # --- MINIMAL MODIFICATION 3: Get the MinIO object name from the User object ---
        # IMPORTANT: Your 'User' model MUST have an attribute like 'profile_picture_object_name'
        # that stores the name/key of the image in your MinIO bucket.
        minio_object_name = user_db.profile_picture

        if not minio_object_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile picture not set for this user.")

        print(f"Fetching profile picture '{minio_object_name}' from MinIO.")
        
        # --- MINIMAL MODIFICATION 4: Pass the correct object name to minioClient.get_object ---
        minio_file_stream = minioClient.get_object(profile_picture_bucket, 
                                                   minio_object_name)
        
        # --- MINIMAL MODIFICATION 5: Determine the appropriate media type (MIME type) ---
        # This helps the browser render the image correctly.
        file_extension = os.path.splitext(minio_object_name)[1].lower()
        media_type = "application/octet-stream" # Default if unknown
        if file_extension in ['.jpg', '.jpeg']:
            media_type = "image/jpeg"
        elif file_extension == '.png':
            media_type = "image/png"
        elif file_extension == '.gif':
            media_type = "image/gif"
        elif file_extension == '.webp':
            media_type = "image/webp"
        # Add more types as needed

        # --- ADD CACHING HEADERS HERE ---
        headers = {
            # 'Cache-Control': 'public, max-age=31536000, immutable', # Cache for 1 year, browser should not revalidate
            # For frequently changing profile pictures, a shorter cache time is better, e.g., 1 hour (3600 seconds)
            'Cache-Control': 'public, max-age=3600', # Cache for 1 hour
            # 'Expires': (datetime.utcnow() + timedelta(hours=1)).strftime('%a, %d %b %Y %H:%M:%S GMT') # Optional: older header
            # You could also add ETag/Last-Modified for revalidation if the image might change
            # and you want the browser to check if it's new before re-downloading.
            # ETag: "some-unique-hash-of-file-content"
            # Last-Modified: "date-of-last-modification"
        }


        # --- MINIMAL MODIFICATION 6: Return the image as a StreamingResponse ---
        return StreamingResponse(minio_file_stream, 
                                 media_type=media_type,
                                 headers=headers)
    except HTTPException: # Re-raise FastAPI HTTPExceptions directly
        raise # Allows FastAPI to handle the raised HTTPException
    except Exception as e:
        print(f"Error retrieving profile picture: {e}")
        # --- MINIMAL MODIFICATION 7: Use HTTPException for other errors too ---
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                            detail="Failed to retrieve profile picture due to server error.")

# @profile_router.get("/picture")
# async def get_profile_picture(user_id: int, db: Session = Depends(get_db)):
#     print("Here in the get profile picture")
#     try:
#         profile_picture_url = db.query(User).filter(User.id == user_id).first()
#         print(f"Here is the profile picture url: {profile_picture_url}")
#         file = minioClient.get_object(profile_picture_bucket, profile_picture_url)
#         print(file)
#     except Exception as e:
#         print(e)
#         return {"message":"error"}, 500
#     return {"message": f"Profile picture for user {user_id}", "url": "some/picture/url.jpg"}


@profile_router.post("/upload")
async def profile_picture(file: UploadFile = File(...)):
    try:
        contents = await file.read()  # Read full content
        print(f"[DEBUG] Uploading {file.filename}, size: {len(contents)} bytes")

        result = minioClient.put_object(
            bucket_name=profile_picture_bucket,
            object_name=file.filename,
            data=io.BytesIO(contents),
            length=len(contents),
            content_type=file.content_type
        )
        print("[DEBUG] Upload successful:", result)
        return JSONResponse(status_code=200, content={"message": "Upload successful", "object_name": file.filename})
    except S3Error as e:
        print(e)
        return JSONResponse(status_code=500, content={"detail": str(e)})
    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={"detail": str(e)})
