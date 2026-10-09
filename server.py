"""
Lightweight HTTP Server for SalesAgents AI Voice Agent Web App
Supports byte-range requests for smooth audio seeking and playback.
"""

import http.server
import socketserver
import os

PORT = 3000

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler supporting byte ranges for audio and video media."""
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), RangeHTTPRequestHandler) as httpd:
        print(f"Server started at http://localhost:{PORT}")
        print(f"Open http://localhost:{PORT} in your web browser.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    run_server()
