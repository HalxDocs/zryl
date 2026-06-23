#!/usr/bin/env sh
set -e

REPO="HalxDocs/zryl"
BIN_NAME="zryl"
INSTALL_DIR="/usr/local/bin"

# Detect OS and architecture
OS="$(uname | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

case "$ARCH" in
  x86_64)  ARCH="amd64" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *) echo "Error: unsupported architecture: $ARCH"; exit 1 ;;
esac

case "$OS" in
  linux|darwin) ;;
  *) echo "Error: unsupported OS: $OS"; exit 1 ;;
esac

ASSET="zryl-${OS}-${ARCH}"
URL="https://github.com/${REPO}/releases/latest/download/${ASSET}"

echo "Installing zryl (${OS}/${ARCH})..."

# Download to temp file
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$URL" -o "$TMP"
elif command -v wget >/dev/null 2>&1; then
  wget -qO "$TMP" "$URL"
else
  echo "Error: curl or wget required"; exit 1
fi

chmod +x "$TMP"

# Install (with sudo if needed)
if [ -w "$INSTALL_DIR" ]; then
  mv "$TMP" "$INSTALL_DIR/$BIN_NAME"
else
  echo "Installing to $INSTALL_DIR (may need sudo)..."
  sudo mv "$TMP" "$INSTALL_DIR/$BIN_NAME"
fi

echo ""
echo "zryl installed! Run: zryl run --help"
