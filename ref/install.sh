#!/bin/bash

# 데이터베이스 비교 도구 설치 스크립트
# Database Comparison Tool Installation Script

echo "🚀 데이터베이스 비교 도구 설치를 시작합니다..."
echo "Starting Database Comparison Tool Installation..."

# Node.js 버전 확인
echo "📋 Node.js 버전 확인 중..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되지 않았습니다."
    echo "   Node.js 14.0.0 이상을 설치해주세요."
    echo "   https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="14.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js 버전이 너무 낮습니다."
    echo "   현재 버전: $NODE_VERSION"
    echo "   필요 버전: $REQUIRED_VERSION 이상"
    exit 1
fi

echo "✅ Node.js 버전: $NODE_VERSION"

# npm 버전 확인
echo "📋 npm 버전 확인 중..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm이 설치되지 않았습니다."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm 버전: $NPM_VERSION"

# 패키지 설치
echo "📦 의존성 패키지 설치 중..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ 패키지 설치가 완료되었습니다."
else
    echo "❌ 패키지 설치 중 오류가 발생했습니다."
    exit 1
fi

# 실행 권한 부여
echo "🔐 실행 권한 설정 중..."
chmod +x database_comparison.js
chmod +x simple_db_compare.js
chmod +x extract_schema.js

echo ""
echo "🎉 설치가 완료되었습니다!"
echo "Installation completed!"
echo ""
echo "📖 사용법:"
echo "Usage:"
echo "  npm run extract    - 데이터베이스 스키마 추출"
echo "  npm run compare    - SQL 파일 비교"
echo "  npm run start      - 직접 데이터베이스 비교"
echo "  npm run help       - 도움말"
echo ""
echo "📚 자세한 사용법은 DATABASE_COMPARISON_README.md 파일을 참조하세요."
echo "For detailed usage, please refer to DATABASE_COMPARISON_README.md"
echo ""
echo "🔧 예시:"
echo "Examples:"
echo "  # MySQL 스키마 추출"
echo "  node extract_schema.js mysql localhost root password database schema.sql"
echo ""
echo "  # SQL 파일 비교"
echo "  node simple_db_compare.js schema1.sql schema2.sql"
echo ""
