<script>
    import ___prj from '$prj/prjMain';

    console.log('PartnerProfile', ___prj.user);
</script>

<div class="partner-profile">
    <div class="profile-header">
        <h2>파트너 정보</h2>
        <div class="user-type-badge partner">파트너</div>
    </div>

    <div class="profile-content">
        <div class="info-section">
            <h3>파트너 기본 정보</h3>
            <div class="info-grid">
                <div class="info-item">
                    <label>파트너 ID</label>
                    <span class="partner-id">{___prj.user?.userId || ___prj.user?.partnerId || 'N/A'}</span>
                </div>
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
            </div>
        </div>

        <div class="info-section">
            <h3>파트너 상태</h3>
            <div class="info-grid">
                <div class="info-item">
                    <label>파트너 등급</label>
                    <span class="partner-level">{___prj.user?.partnerLevel || '일반'}</span>
                </div>
                <div class="info-item">
                    <label>활성 상태</label>
                    <span class="status active">활성</span>
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

        <div class="partner-notice">
            <div class="notice-icon">ℹ️</div>
            <div class="notice-content">
                <h4>파트너 안내</h4>
                <p>파트너 전용 기능 및 서비스 이용에 대한 자세한 정보는 관리자에게 문의해주세요.</p>
            </div>
        </div>
    </div>
</div>

<style>
    .partner-profile {
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
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

    .user-type-badge.partner {
        background: rgba(255, 107, 107, 0.3);
        border-color: rgba(255, 107, 107, 0.5);
        color: #ff6b6b;
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

    .partner-id {
        background: #fff3cd !important;
        border-left-color: #ffc107 !important;
        color: #856404 !important;
        font-weight: 600;
        font-family: 'Courier New', monospace;
    }

    .partner-level {
        background: #d1ecf1 !important;
        border-left-color: #17a2b8 !important;
        color: #0c5460 !important;
        font-weight: 600;
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

    .partner-notice {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border: 1px solid #90caf9;
        border-radius: 12px;
        padding: 20px;
        display: flex;
        gap: 15px;
        align-items: flex-start;
    }

    .notice-icon {
        font-size: 24px;
        flex-shrink: 0;
    }

    .notice-content h4 {
        margin: 0 0 8px 0;
        color: #1976d2;
        font-size: 1.1rem;
    }

    .notice-content p {
        margin: 0;
        color: #1565c0;
        line-height: 1.5;
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

        .partner-notice {
            flex-direction: column;
            text-align: center;
        }

        .notice-icon {
            align-self: center;
        }
    }
</style>
