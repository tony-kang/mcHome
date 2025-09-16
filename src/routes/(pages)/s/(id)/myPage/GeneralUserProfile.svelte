<script>
    import ___prj from '$prj/prjMain';

    console.log('GeneralUserProfile', ___prj.user);
</script>

<div class="general-user-profile">
    <div class="profile-header">
        <h2>일반 사용자 정보</h2>
        <div class="user-type-badge general">일반 사용자</div>
    </div>

    <div class="profile-content">
        <div class="info-section">
            <h3>기본 정보</h3>
            <div class="info-grid">
                <div class="info-item">
                    <label>사용자명</label>
                    <span>{___prj.user?.userName || ___prj.user?.nickname || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <label>이메일</label>
                    <span>{___prj.user?.email || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <label>가입일</label>
                    <span>{___prj.user?.joinDate || ___prj.user?.createdAt || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <label>최근 로그인</label>
                    <span>{___prj.user?.lastLogin || 'N/A'}</span>
                </div>
            </div>
        </div>

        {#if ___prj.user?.profileImage}
        <div class="profile-image-section">
            <h3>프로필 이미지</h3>
            <div class="profile-image-container">
                <img src={___prj.user.profileImage} alt="프로필 이미지" class="profile-image" />
            </div>
        </div>
        {/if}

        <div class="info-section">
            <h3>추가 정보</h3>
            <div class="info-grid">
                <div class="info-item">
                    <label>사용자 ID</label>
                    <span>{___prj.user?.userId || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <label>상태</label>
                    <span class="status active">활성</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .general-user-profile {
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        text-align: center;
        position: relative;
    }

    .profile-header h2 {
        margin: 0 0 10px 0;
        font-size: 1.8rem;
        font-weight: 600;
    }

    .user-type-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .user-type-badge.general {
        background: rgba(40, 167, 69, 0.2);
        border-color: rgba(40, 167, 69, 0.3);
        color: #28a745;
    }

    .profile-content {
        padding: 30px;
    }

    .info-section {
        margin-bottom: 30px;
    }

    .info-section h3 {
        margin: 0 0 20px 0;
        color: #333;
        font-size: 1.3rem;
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 10px;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .info-item label {
        font-weight: 600;
        color: #666;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .info-item span {
        color: #333;
        font-size: 16px;
        padding: 8px 12px;
        background: #f8f9fa;
        border-radius: 6px;
        border-left: 4px solid #007bff;
    }

    .status.active {
        background: #d4edda;
        border-left-color: #28a745;
        color: #155724;
    }

    .profile-image-section {
        margin-bottom: 30px;
        text-align: center;
    }

    .profile-image-section h3 {
        margin: 0 0 20px 0;
        color: #333;
        font-size: 1.3rem;
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 10px;
        text-align: left;
    }

    .profile-image-container {
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid #e9ecef;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .profile-image {
        width: 120px;
        height: 120px;
        object-fit: cover;
        display: block;
    }

    @media (max-width: 768px) {
        .profile-header {
            padding: 20px;
        }

        .profile-header h2 {
            font-size: 1.5rem;
        }

        .profile-content {
            padding: 20px;
        }

        .info-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .profile-image {
            width: 100px;
            height: 100px;
        }
    }
</style>
