from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    response = client.get('/health')
    assert response.status_code == 200


def test_metrics_endpoint():
    response = client.get('/metrics')
    assert response.status_code == 200


def test_chat_endpoint():
    response = client.post('/chat', json={'question': 'Why did margins drop?'})
    assert response.status_code == 200


def test_history_endpoint():
    client.post('/chat', json={'question': 'Why did margins drop?'})
    response = client.get('/history')
    assert response.status_code == 200
    assert response.json()
