#!/bin/bash

# 우분투 서버 설정 백업 스크립트
# 작성일: $(date +%Y-%m-%d)

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 백업 디렉토리 설정
BACKUP_DIR="/home/backup/$(date +%Y%m%d_%H%M%S)"
LOG_FILE="/var/log/backup_$(date +%Y%m%d_%H%M%S).log"

echo -e "${BLUE}=== 우분투 서버 설정 백업 시작 ===${NC}"
echo "백업 디렉토리: $BACKUP_DIR"
echo "로그 파일: $LOG_FILE"

# 백업 디렉토리 생성
sudo mkdir -p "$BACKUP_DIR"
sudo chown $USER:$USER "$BACKUP_DIR"

# 로그 함수
log_message() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

log_message "${GREEN}백업 시작 시간: $(date)${NC}"

# 1. 시스템 설정 파일 백업
log_message "${YELLOW}1. 시스템 설정 파일 백업 중...${NC}"

# 네트워크 설정
sudo cp /etc/hosts "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}hosts 파일 백업 실패${NC}"
sudo cp /etc/network/interfaces "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}network interfaces 백업 실패${NC}"

# SSH 설정
sudo cp /etc/ssh/sshd_config "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}SSH 설정 백업 실패${NC}"
sudo cp -r /etc/ssh/ssh_host_* "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}SSH 호스트 키 백업 실패${NC}"

# 웹 서버 설정
sudo cp /etc/nginx/nginx.conf "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}Nginx 설정 백업 실패${NC}"
sudo cp -r /etc/nginx/sites-available/ "$BACKUP_DIR/nginx_sites_available/" 2>/dev/null || log_message "${RED}Nginx sites-available 백업 실패${NC}"
sudo cp -r /etc/nginx/sites-enabled/ "$BACKUP_DIR/nginx_sites_enabled/" 2>/dev/null || log_message "${RED}Nginx sites-enabled 백업 실패${NC}"

sudo cp /etc/apache2/apache2.conf "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}Apache 설정 백업 실패${NC}"
sudo cp -r /etc/apache2/sites-available/ "$BACKUP_DIR/apache_sites_available/" 2>/dev/null || log_message "${RED}Apache sites-available 백업 실패${NC}"

# 데이터베이스 설정
sudo cp /etc/mysql/my.cnf "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}MySQL 설정 백업 실패${NC}"
sudo cp -r /etc/mysql/conf.d/ "$BACKUP_DIR/mysql_conf.d/" 2>/dev/null || log_message "${RED}MySQL conf.d 백업 실패${NC}"

# PostgreSQL 설정
sudo cp /etc/postgresql/*/main/postgresql.conf "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}PostgreSQL 설정 백업 실패${NC}"
sudo cp /etc/postgresql/*/main/pg_hba.conf "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}PostgreSQL pg_hba.conf 백업 실패${NC}"

# 시스템 서비스 설정
sudo cp -r /etc/systemd/system/ "$BACKUP_DIR/systemd_system/" 2>/dev/null || log_message "${RED}Systemd 서비스 설정 백업 실패${NC}"

# 2. 사용자 및 권한 설정 백업
log_message "${YELLOW}2. 사용자 및 권한 설정 백업 중...${NC}"

sudo cp /etc/passwd "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}passwd 파일 백업 실패${NC}"
sudo cp /etc/shadow "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}shadow 파일 백업 실패${NC}"
sudo cp /etc/group "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}group 파일 백업 실패${NC}"
sudo cp /etc/sudoers "$BACKUP_DIR/" 2>/dev/null || log_message "${RED}sudoers 파일 백업 실패${NC}"

# 사용자 SSH 키
cp -r ~/.ssh/ "$BACKUP_DIR/user_ssh/" 2>/dev/null || log_message "${RED}사용자 SSH 키 백업 실패${NC}"

# 3. 설치된 패키지 목록 백업
log_message "${YELLOW}3. 설치된 패키지 목록 백업 중...${NC}"

dpkg --get-selections > "$BACKUP_DIR/installed_packages.txt" 2>/dev/null || log_message "${RED}패키지 목록 백업 실패${NC}"
apt list --installed > "$BACKUP_DIR/apt_installed.txt" 2>/dev/null || log_message "${RED}APT 패키지 목록 백업 실패${NC}"

# 4. 시스템 정보 백업
log_message "${YELLOW}4. 시스템 정보 백업 중...${NC}"

uname -a > "$BACKUP_DIR/system_info.txt" 2>/dev/null || log_message "${RED}시스템 정보 백업 실패${NC}"
lsb_release -a > "$BACKUP_DIR/lsb_release.txt" 2>/dev/null || log_message "${RED}LSB 정보 백업 실패${NC}"
lscpu > "$BACKUP_DIR/cpu_info.txt" 2>/dev/null || log_message "${RED}CPU 정보 백업 실패${NC}"
free -h > "$BACKUP_DIR/memory_info.txt" 2>/dev/null || log_message "${RED}메모리 정보 백업 실패${NC}"
df -h > "$BACKUP_DIR/disk_info.txt" 2>/dev/null || log_message "${RED}디스크 정보 백업 실패${NC}"

# 5. 방화벽 설정 백업
log_message "${YELLOW}5. 방화벽 설정 백업 중...${NC}"

# UFW 설정
sudo ufw status > "$BACKUP_DIR/ufw_status.txt" 2>/dev/null || log_message "${RED}UFW 상태 백업 실패${NC}"

# iptables 설정
sudo iptables-save > "$BACKUP_DIR/iptables_rules.txt" 2>/dev/null || log_message "${RED}iptables 규칙 백업 실패${NC}"

# 6. 크론 작업 백업
log_message "${YELLOW}6. 크론 작업 백업 중...${NC}"

crontab -l > "$BACKUP_DIR/user_crontab.txt" 2>/dev/null || log_message "${RED}사용자 크론탭 백업 실패${NC}"
sudo crontab -l > "$BACKUP_DIR/root_crontab.txt" 2>/dev/null || log_message "${RED}루트 크론탭 백업 실패${NC}"

# 7. 환경 변수 백업
log_message "${YELLOW}7. 환경 변수 백업 중...${NC}"

env > "$BACKUP_DIR/environment_variables.txt" 2>/dev/null || log_message "${RED}환경 변수 백업 실패${NC}"

# 8. 백업 압축
log_message "${YELLOW}8. 백업 파일 압축 중...${NC}"

cd /home/backup/
tar -czf "ubuntu_backup_$(date +%Y%m%d_%H%M%S).tar.gz" "$(basename "$BACKUP_DIR")" 2>/dev/null || log_message "${RED}백업 압축 실패${NC}"

# 9. 백업 완료 정보
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
COMPRESSED_SIZE=$(du -sh "ubuntu_backup_$(date +%Y%m%d_%H%M%S).tar.gz" | cut -f1)

log_message "${GREEN}=== 백업 완료 ===${NC}"
log_message "${GREEN}백업 디렉토리: $BACKUP_DIR${NC}"
log_message "${GREEN}백업 크기: $BACKUP_SIZE${NC}"
log_message "${GREEN}압축 파일: ubuntu_backup_$(date +%Y%m%d_%H%M%S).tar.gz${NC}"
log_message "${GREEN}압축 크기: $COMPRESSED_SIZE${NC}"
log_message "${GREEN}백업 완료 시간: $(date)${NC}"

echo -e "${BLUE}=== 백업 완료! ===${NC}"
echo -e "${YELLOW}백업 파일 위치: /home/backup/ubuntu_backup_$(date +%Y%m%d_%H%M%S).tar.gz${NC}"
echo -e "${YELLOW}로그 파일: $LOG_FILE${NC}"

