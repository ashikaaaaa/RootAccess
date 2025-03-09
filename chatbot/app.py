import os
from fastapi import FastAPI
from pydantic import BaseModel
from together import Together
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Securely set Together.AI API Key
TOGETHER_AI_API_KEY = "os.getenv("TOGETHER_AI_API_KEY")"
client = Together(api_key=TOGETHER_AI_API_KEY)

# Request Model
class QueryRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(request: QueryRequest):
    """
    API endpoint to get responses from Together.AI chatbot.
    """
    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages=[{"role": "user", "content": request.query}]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}

# Run FastAPI with:
# uvicorn chatbot:app --host 0.0.0.0 --port 8000 --reload
