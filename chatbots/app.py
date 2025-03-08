import os
import streamlit as st
from together import Together

# Securely set API Key (Replace with your own key or set as an environment variable)

TOGETHER_AI_API_KEY = "tgp_v1_NQx681PDqMZanHIOC00I8zLOav6soT-0hWDilfyGrzk"
if not TOGETHER_AI_API_KEY:
    st.error("Missing Together.AI API Key! Set TOGETHER_AI_API_KEY as an environment variable.")
    st.stop()

client = Together(api_key = TOGETHER_AI_API_KEY)

def get_together_ai_response(query):
    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages=[{"role": "user", "content": query}]
        )
        return response.choices[0].message.content
    except Exception as e:
        st.error(f"Error generating response: {e}")
        return ""

def main():
    """
    Main function to run the Streamlit chatbot.
    """
    st.set_page_config(page_title="Simple Chat Bot", layout="wide")
    st.markdown("# Simple Chat Bot Page")

    st.subheader("Start a Conversation")
    input_text = st.text_input("Your Message:", key="input")
    submit_button = st.button("Send")

    if submit_button and input_text:
        output = get_together_ai_response(input_text)
        st.markdown(f"**You:** {input_text}")
        st.markdown(f"**Bot:** {output}")

    # Apply custom CSS
    st.markdown("""
    <style>
        .stButton button { background-color: #4CAF50; color: white; }
        .stTextInput div { border-color: #4CAF50; }
    </style>
    """, unsafe_allow_html=True)

    # Footer
    st.markdown("""
        <hr>
        <footer><p>Thank You!</p></footer>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
