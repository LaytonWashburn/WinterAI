from langchain_community.tools import DuckDuckGoSearchResults

search = DuckDuckGoSearchResults()

def duck_duck_go_search(query: str):
    try:
        print(f"Duck duck go processing query: {query}")
        res = search.invoke(query)
        return { "status": "ok", "message":res}
    except Exception as e:
        return {"status": "error", "message":f"An error occurred during DuckDuckGo search: {e}"}