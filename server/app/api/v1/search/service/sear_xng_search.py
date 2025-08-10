import requests
import json

class SearxngService:
    def __init__(self, base_url: str = "http://searxng:8080"):
        self.base_url = base_url

    def search(self, query: str, client_ip: str):
        print(f"Searching for: {query}")
        url = f"{self.base_url}/search"
        headers = {
            "Accept": "application/json",
            "X-Forwarded-For": client_ip
        }
        params = {
            "q": query,
            "format": "json"
        }
        
        try:
            response = requests.get(url, headers=headers, params=params)
            print(response)
            response.raise_for_status()
            results = response.json()
            return results
        except requests.exceptions.RequestException as e:
            raise e

def get_searxng_service() -> SearxngService:
    return SearxngService()