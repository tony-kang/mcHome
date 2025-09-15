# 마인드코딩 카카오 로그인 API 엔드포인트 (보안 강화)

## 1. 카카오 로그인 처리 API (통합)
```
POST /api/auth/kakao/login
Content-Type: application/json

Request Body:
{
  "code": "authorization_code_from_kakao",
  "redirect_uri": "http://localhost:5173/s/oauth"
}

Response:
{
  "success": true,
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "userId": "mc_123456789",
    "username": "사용자닉네임",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "profileImage": "https://...",
    "userType": 1,
    "userTypeLabel": "일반 사용자",
    "joinDate": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-01T00:00:00Z",
    "kakaoId": "123456789",
    "phone": "+82-10-1234-5678",
    "gender": "male",
    "birthday": "0101",
    "isActive": true
  },
  "is_new_user": false
}
```

### 서버에서 처리하는 과정:
1. **카카오 토큰 교환**: 인가코드를 카카오 서버에서 액세스 토큰으로 교환
2. **사용자 정보 조회**: 카카오 API에서 사용자 정보 가져오기
3. **마인드코딩 DB 처리**: 사용자 확인/생성 및 마인드코딩 사이트 로그인
4. **JWT 발급**: 마인드코딩 사이트용 JWT 토큰 생성
5. **응답 반환**: 사용자 정보와 JWT 토큰을 클라이언트에 반환

### 보안 강화 사항:
- ✅ 클라이언트에서 카카오 앱 키 노출 방지
- ✅ 서버에서만 카카오 API 통신
- ✅ JWT 토큰으로 마인드코딩 사이트 인증
- ✅ 사용자 정보는 서버에서 검증 후 반환

## 3. 사용자 로그인 상태 확인 API
```
GET /api/users/me
Authorization: Bearer jwt_token

Response:
{
  "success": true,
  "user": {
    "id": 1,
    "user_id": "kakao_123456789",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "profile_image": "https://...",
    "user_type": "general",
    "user_type_label": "일반 사용자",
    "join_date": "2024-01-01T00:00:00Z",
    "last_login": "2024-01-01T00:00:00Z",
    "is_active": true
  }
}
```

## 4. JWT 토큰 발급 API
```
POST /api/auth/jwt
Content-Type: application/json

Request Body:
{
  "user_id": "kakao_123456789",
  "login_type": "kakao"
}

Response:
{
  "success": true,
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

## 데이터베이스 스키마

### users 테이블
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255),
    nickname VARCHAR(100),
    profile_image TEXT,
    user_type ENUM('general', 'admin', 'partner') DEFAULT 'general',
    user_type_label VARCHAR(50) DEFAULT '일반 사용자',
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_oauth (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- 'kakao', 'google', etc.
    provider_user_id VARCHAR(100) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE KEY unique_provider_user (provider, provider_user_id)
);
```
