FROM ubuntu
WORKDIR /app
RUN apt update
RUN apt install -y python3
RUN apt install -y python3-pip
RUN apt install -y python3-fastapi
RUN apt install -y uvicorn
COPY app.py /app
CMD ["uvicorn", "app:app", "--reload"]
EXPOSE 8000