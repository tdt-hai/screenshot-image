# Screenshot Capture image
có 2 path dùng cho all và cho grafana 
```
/screenshot/all
/screenshot/grafana
```
### Docker Setup

1. Build
```bash
docker build -t screenshort .
```

2. Run/Start
```bash
docker run -p -d 3000:3000 screenshort
```

You can browse the APIs at <http://<ip>:3000>

