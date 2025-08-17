from minio import Minio
from minio.error import S3Error
import os

profile_picture_bucket="profile-pictures"

minioClient = Minio(
    "minio:9000",  # your MinIO server endpoint
    access_key="minioadmin",  # your access key
    secret_key="minioadmin",  # your secret key
    secure=False  # IMPORTANT: use False if MinIO is running without TLS/SSL
)

try:
    if not minioClient.bucket_exists(profile_picture_bucket):
        minioClient.make_bucket(profile_picture_bucket)
except S3Error as e:
    print(e)