#!/bin/bash
set -euo pipefail

PROJECT_ROOT=$(pwd)
LOG_FILE="$PROJECT_ROOT/startup.log"
PID_FILE="$PROJECT_ROOT/app.pid"

log_info() {
  date "+%Y-%m-%d %H:%M:%S %Z" "$@" >> "$LOG_FILE"
}

log_error() {
  date "+%Y-%m-%d %H:%M:%S %Z" "$@" >> "$LOG_FILE" 
  echo "$@" >&2
}

cleanup() {
  log_info "Cleaning up..."
  if [ -f "$PID_FILE" ]; then
    kill $(cat "$PID_FILE") 2>/dev/null
    rm "$PID_FILE"
  fi
  log_info "Cleanup complete."
}

check_dependencies() {
  if ! command -v npm &> /dev/null; then
    log_error "Error: npm is not installed."
    exit 1
  fi
  log_info "npm is installed."
  if ! command -v node &> /dev/null; then
      log_error "Error: node is not installed."
      exit 1
   fi
   log_info "node is installed."
}


check_package_json() {
    if [ ! -f "$PROJECT_ROOT/package.json" ]; then
      log_error "Error: package.json not found."
      exit 1
    fi
    log_info "package.json found."
}

check_api_index() {
  if [ ! -f "$PROJECT_ROOT/api/index.js" ]; then
    log_error "Error: api/index.js not found."
    exit 1
  fi
    log_info "api/index.js found."
}

install_dependencies() {
  log_info "Installing dependencies..."
  cd "$PROJECT_ROOT"
  npm install >> "$LOG_FILE" 2>&1
  if [ $? -ne 0 ]; then
    log_error "Error: npm install failed."
    exit 1
  fi
    log_info "Dependencies installed."
}

build_frontend() {
  log_info "Building frontend..."
  cd "$PROJECT_ROOT"
  npm run build >> "$LOG_FILE" 2>&1
  if [ $? -ne 0 ]; then
    log_error "Error: npm run build failed."
    exit 1
  fi
    log_info "Frontend built."
}

start_backend() {
  log_info "Starting backend server..."
  cd "$PROJECT_ROOT"
  node api/index.js >> "$LOG_FILE" 2>&1 &
  BACKEND_PID=$!
  echo "$BACKEND_PID" > "$PID_FILE"
  log_info "Backend server started with PID: $BACKEND_PID"
}

trap cleanup EXIT ERR INT TERM

log_info "Starting application..."

check_dependencies
check_package_json
check_api_index
install_dependencies
build_frontend
start_backend

log_info "Application startup complete."