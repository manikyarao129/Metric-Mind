import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
LLM_ENDPOINT = os.getenv("LLM_ENDPOINT", "https://api.openai.com/v1")
CUBE_API_URL = os.getenv("CUBE_API_URL", "http://localhost:4000")
CUBE_API_TOKEN = os.getenv("CUBE_API_TOKEN", "")
SNOWFLAKE_ACCOUNT = os.getenv("SNOWFLAKE_ACCOUNT", "")
SNOWFLAKE_USER = os.getenv("SNOWFLAKE_USER", "")
SNOWFLAKE_PASSWORD = os.getenv("SNOWFLAKE_PASSWORD", "")
CHROMA_PATH = os.getenv("CHROMA_PATH", "/tmp/chroma")
