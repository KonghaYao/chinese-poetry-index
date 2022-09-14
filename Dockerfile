FROM python:3.7-alpine

COPY ./csv /csv
COPY ./scripts /scripts
WORKDIR /scripts
RUN pip install -r requirements.txt
CMD ["python","index.py"]