import os
from fastapi import FastAPI, UploadFile, File
from deepgram import Deepgram
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Securely set Deepgram API Key
DEEPGRAM_API_KEY = "bba0e63ccdf08795352c3f7f6407ffddde92c7a1"
deepgram = Deepgram(DEEPGRAM_API_KEY)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        audio_bytes = await file.read()
        response = deepgram.transcription.sync_prerecorded(
            {"buffer": audio_bytes, "mimetype": file.content_type}
        )
        transcript = response["results"]["channels"][0]["alternatives"][0]["transcript"]
        return {"transcript": transcript}
    except Exception as e:
        return {"error": str(e)}