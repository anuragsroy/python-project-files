from fastapi import FastAPI, Response
#from fastapi.responses import JSONResponse
import random
import time

app = FastAPI()

# Counter to keep track of number of requests
request_counter = 0

@app.get("/metrics")
def get_metrics():
    global request_counter
    request_counter += 1  # dynamically increasing counter

    metrics = {
         "cpu_usage_percent": round(random.uniform(10, 90), 2),  # Simulated CPU usage
        "memory_usage_mb": round(random.uniform(500, 4000), 2), # Simulated memory usage
        "request_latency_ms": round(random.uniform(10, 300), 2),# Simulated latency
        "request_counter": request_counter                        # dynamic counter
              }

    return Response(content=metrics)
