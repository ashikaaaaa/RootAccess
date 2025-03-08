import os
import streamlit as st
from deepgram import Deepgram
from streamlit_mic_recorder import mic_recorder

# Securely set Deepgram API Key
DEEPGRAM_API_KEY = "bba0e63ccdf08795352c3f7f6407ffddde92c7a1"
if not DEEPGRAM_API_KEY:
    st.error("Missing Deepgram API Key! Set DEEPGRAM_API_KEY as 5an environment variable.")
    st.stop()

def transcribe_audio(audio_bytes, mimetype="audio/wav"):
    try:
        deepgram = Deepgram(DEEPGRAM_API_KEY)
        response = deepgram.transcription.sync_prerecorded(
            {"buffer": audio_bytes, "mimetype": mimetype}
        )
        return response["results"]["channels"][0]["alternatives"][0]["transcript"]
    except Exception as e:
        st.error(f"Error transcribing audio: {e}")
        return ""

def main():
    """
    Streamlit app for speech-to-text using Deepgram.
    """
    st.set_page_config(page_title="Speech-to-Text App", layout="wide")
    st.markdown("# Speech-to-Text App")

    # Microphone Input
    st.subheader("Record Your Voice")
    audio_data = mic_recorder(start_prompt="Record", stop_prompt="Stop")
    audio_bytes = audio_data["bytes"] if audio_data and "bytes" in audio_data else None  # Extract raw audio bytes
    
    if audio_bytes:
        st.audio(audio_bytes, format="audio/wav")
        if st.button("Transcribe Recording"):
            transcript = transcribe_audio(audio_bytes, "audio/wav")
            st.markdown("## Transcription:")
            st.write(transcript)

    # File Upload Input
    st.subheader("Upload an Audio File")
    uploaded_file = st.file_uploader("Upload an audio file", type=["wav", "mp3", "ogg", "flac"])
    
    if uploaded_file is not None:
        st.audio(uploaded_file, format="audio/wav")
        if st.button("Transcribe File"):
            transcript = transcribe_audio(uploaded_file.read(), uploaded_file.type)
            st.markdown("## Transcription:")
            st.write(transcript)

if __name__ == "__main__":
    main()
