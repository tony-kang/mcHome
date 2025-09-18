#!/bin/bash

# 우분투 서버 설정 복원 스크립트
# 사용법: ./ubuntu-restore.sh /path/to/backup.tar.gz

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 백업 파일 경로 확인
if [ $# -eq 0 ]; then
    echo -e "${RED}사용법: $0 <백업파일.tar.gz>${NC}"
    echo -e "${YELLOW}예시: $0 /home/backup/ubuntu_backup_20241201_143000.tar.gz${NC}"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}백업 파일을 찾을 수 없습니다: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}=== 우분투 서버 설정 복원 시작 ===${NC}"
echo -e "${YELLOW}백업 파일: $BACKUP_FILE${NC}"

# 백업 파일 압축 해제
TEMP_DIR="/tmp/restore_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

echo -e "${YELLOW}백업 파일 압축 해제 중...${NC}"
tar -xzf "$BACKUP_FILE" || {
    echo -e "${RED}백업 파일 압축 해제 실패${NC}"
    exit 1
}

# 백업 디렉토리 찾기
BACKUP_DIR=$(find . -maxdepth 1 -type d -name "backup_*" | head -1)
if [ -z "$BACKUP_DIR" ]; then
    echo -e "${RED}백업 디렉토리를 찾을 수 없습니다${NC}"
    exit 1
fi

echo -e "${GREEN}백업 디렉토리 발견: $BACKUP_DIR${NC}"

# 로그 함수
log_message() {
    echo -e "$1"
}

# 복원 전 확인
echo -e "${YELLOW}복원을 진행하시겠습니까? (y/N)${NC}"
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo -e "${RED}복원이 취소되었습니다${NC}"
    rm -rf "$TEMP_DIR"
    exit 0
fi

log_message "${YELLOW}=== 설정 복원 시작 ===${NC}"

# 1. 네트워크 설정 복원
log_message "${YELLOW}1. 네트워크 설정 복원 중...${NC}"
if [ -f "$BACKUP_DIR/hosts" ]; then
    sudo cp "$BACKUP_DIR/hosts" /etc/hosts
    log_message "${GREEN}✓ hosts 파일 복원 완료${NC}"
fi

if [ -f "$BACKUP_DIR/interfaces" ]; then
    sudo cp "$BACKUP_DIR/interfaces" /etc/network/interfaces
    log_message "${GREEN}✓ network interfaces 복원 완료${NC}"
fi

# 2. SSH 설정 복원
log_message "${YELLOW}2. SSH 설정 복원 중...${NC}"
if [ -f "$BACKUP_DIR/sshd_config" ]; then
    sudo cp "$BACKUP_DIR/sshd_config" /etc/ssh/sshd_config
    log_message "${GREEN}✓ SSH 설정 복원 완료${NC}"
fi

if [ -d "$BACKUP_DIR/ssh_host_rsa_key" ]; then
    sudo cp -r "$BACKUP_DIR"/ssh_host_* /etc/ssh/
    log_message "${GREEN}✓ SSH 호스트 키 복원 완료${NC}"
fi

# 3. 웹 서버 설정 복원
log_message "${YELLOW}3. 웹 서버 설정 복원 중...${NC}"

# Nginx 설정
if [ -f "$BACKUP_DIR/nginx.conf" ]; then
    sudo cp "$BACKUP_DIR/nginx.conf" /etc/nginx/nginx.conf
    log_message "${GREEN}✓ Nginx 설정 복원 완료${NC}"
fi

if [ -d "$BACKUP_DIR/nginx_sites_available" ]; then
    sudo cp -r "$BACKUP_DIR/nginx_sites_available"/* /etc/nginx/sites-available/
    log_message "${GREEN}✓ Nginx sites-available 복원 완료${NC}"
fi

if [ -d "$BACKUP_DIR/nginx_sites_enabled" ]; then
    sudo cp -r "$BACKUP_DIR/nginx_sites_enabled"/* /etc/nginx/sites-enabled/
    log_message "${GREEN}✓ Nginx sites-enabled 복원 완료${NC}"
fi

# Apache 설정
if [ -f "$BACKUP_DIR/apache2.conf" ]; then
    sudo cp "$BACKUP_DIR/apache2.conf" /etc/apache2/apache2.conf
    log_message "${GREEN}✓ Apache 설정 복원 완료${NC}"
fi

if [ -d "$BACKUP_DIR/apache_sites_available" ]; then
    sudo cp -r "$BACKUP_DIR/apache_sites_available"/* /etc/apache2/sites-available/
    log_message "${GREEN}✓ Apache sites-available 복원 완료${NC}"
fi

# 4. 데이터베이스 설정 복원
log_message "${YELLOW}4. 데이터베이스 설정 복원 중...${NC}"

# MySQL 설정
if [ -f "$BACKUP_DIR/my.cnf" ]; then
    sudo cp "$BACKUP_DIR/my.cnf" /etc/mysql/my.cnf
    log_message "${GREEN}✓ MySQL 설정 복원 완료${NC}"
fi

if [ -d "$BACKUP_DIR/mysql_conf.d" ]; then
    sudo cp -r "$BACKUP_DIR/mysql_conf.d"/* /etc/mysql/conf.d/
    log_message "${GREEN}✓ MySQL conf.d 복원 완료${NC}"
fi

# PostgreSQL 설정
if [ -f "$BACKUP_DIR/postgresql.conf" ]; then
    sudo cp "$BACKUP_DIR/postgresql.conf" /etc/postgresql/*/main/postgresql.conf
    log_message "${GREEN}✓ PostgreSQL 설정 복원 완료${NC}"
fi

if [ -f "$BACKUP_DIR/pg_hba.conf" ]; then
    sudo cp "$BACKUP_DIR/pg_hba.conf" /etc/postgresql/*/main/pg_hba.conf
    log_message "${GREEN}✓ PostgreSQL pg_hba.conf 복원 완료${NC}"
fi

# 5. 시스템 서비스 설정 복원
log_message "${YELLOW}5. 시스템 서비스 설정 복원 중...${NC}"
if [ -d "$BACKUP_DIR/systemd_system" ]; then
    sudo cp -r "$BACKUP_DIR/systemd_system"/* /etc/systemd/system/
    log_message "${GREEN}✓ Systemd 서비스 설정 복원 완료${NC}"
fi

# 6. 사용자 및 권한 설정 복원
log_message "${YELLOW}6. 사용자 및 권한 설정 복원 중...${NC}"
if [ -f "$BACKUP_DIR/passwd" ]; then
    sudo cp "$BACKUP_DIR/passwd" /etc/passwd
    log_message "${GREEN}✓ passwd 파일 복원 완료${NC}"
fi

if [ -f "$BACKUP_DIR/group" ]; then
    sudo cp "$BACKUP_DIR/group" /etc/group
    log_message "${GREEN}✓ group 파일 복원 완료${NC}"
fi

if [ -f "$BACKUP_DIR/sudoers" ]; then
    sudo cp "$BACKUP_DIR/sudoers" /etc/sudoers
    log_message "${GREEN}✓ sudoers 파일 복원 완료${NC}"
fi

# 사용자 SSH 키 복원
if [ -d "$BACKUP_DIR/user_ssh" ]; then
    cp -r "$BACKUP_DIR/user_ssh"/* ~/.ssh/
    chmod 700 ~/.ssh/
    chmod 600 ~/.ssh/id_*
    log_message "${GREEN}✓ 사용자 SSH 키 복원 완료${NC}"
fi

# 7. 크론 작업 복원
log_message "${YELLOW}7. 크론 작업 복원 중...${NC}"
if [ -f "$BACKUP_DIR/user_crontab.txt" ]; then
    crontab "$BACKUP_DIR/user_crontab.txt"
    log_message "${GREEN}✓ 사용자 크론탭 복원 완료${NC}"
fi

if [ -f "$BACKUP_DIR/root_crontab.txt" ]; then
    sudo crontab "$BACKUP_DIR/root_crontab.txt"
    log_message "${GREEN}✓ 루트 크론탭 복원 완료${NC}"
fi

# 8. 방화벽 설정 복원
log_message "${YELLOW}8. 방화벽 설정 복원 중...${NC}"
if [ -f "$BACKUP_DIR/iptables_rules.txt" ]; then
    sudo iptables-restore < "$BACKUP_DIR/iptables_rules.txt"
    log_message "${GREEN}✓ iptables 규칙 복원 완료${NC}"
fi

# 9. 서비스 재시작
log_message "${YELLOW}9. 서비스 재시작 중...${NC}"

# SSH 서비스 재시작
sudo systemctl restart ssh
log_message "${GREEN}✓ SSH 서비스 재시작 완료${NC}"

# Nginx 재시작 (설정이 있는 경우)
if [ -f /etc/nginx/nginx.conf ]; then
    sudo nginx -t && sudo systemctl restart nginx
    log_message "${GREEN}✓ Nginx 서비스 재시작 완료${NC}"
fi

# Apache 재시작 (설정이 있는 경우)
if [ -f /etc/apache2/apache2.conf ]; then
    sudo systemctl restart apache2
    log_message "${GREEN}✓ Apache 서비스 재시작 완료${NC}"
fi

# MySQL 재시작 (설정이 있는 경우)
if [ -f /etc/mysql/my.cnf ]; then
    sudo systemctl restart mysql
    log_message "${GREEN}✓ MySQL 서비스 재시작 완료${NC}"
fi

# PostgreSQL 재시작 (설정이 있는 경우)
if [ -f /etc/postgresql/*/main/postgresql.conf ]; then
    sudo systemctl restart postgresql
    log_message "${GREEN}✓ PostgreSQL 서비스 재시작 완료${NC}"
fi

# 10. 임시 파일 정리
log_message "${YELLOW}10. 임시 파일 정리 중...${NC}"
rm -rf "$TEMP_DIR"

# 11. 복원 완료
log_message "${GREEN}=== 복원 완료! ===${NC}"
log_message "${GREEN}복원 완료 시간: $(date)${NC}"
log_message "${YELLOW}시스템을 재부팅하는 것을 권장합니다: sudo reboot${NC}"

echo -e "${BLUE}=== 복원 완료! ===${NC}"
echo -e "${YELLOW}중요: 시스템 재부팅을 권장합니다${NC}"
echo -e "${YELLOW}명령어: sudo reboot${NC}"

