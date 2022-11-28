<div class="main_header">
    <div class="navbar_menu">
        <div class="title">
            <div class="title_image">
                <img src="/assets/images/logo.png"/>
                <span>Địa điểm Y Tế</span>
            </div>
            <div class="close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div class="link_list">
            <?php if (Auth::check()) :  ?>
                <?php $user=Auth::user() ?? null; if ($user->role == "admin") : ?>
                    <div class="link_content">
                        <div class="list_image">
                            <i class="fa-solid fa-map"></i>
                        </div>
                        <div class="list_desc">
                            <a id="admin" href="/admin">Chỉnh sửa Bản đồ</a>
                        </div>
                    </div>
                <?php endif; ?>
                    <div class="link_content">
                        <div class="list_image">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </div>
                        <div class="list_desc">
                            <a role="button" href="/logout">Đăng xuất</a>
                        </div>
                    </div>
            <?php else : ?>
                <div class="link_content">
                        <div class="list_image">
                            <i class="fa-solid fa-right-to-bracket"></i>
                        </div>
                        <div class="list_desc">
                            <a id="signin" href="/login">Đăng nhập</a>
                        </div>
                    </div>
            <?php endif; ?>
        </div>
        <div class="link_list">
            <div class="link_content">
                <div class="list_image">
                <img src="/assets/images/diadiem.png" />
                </div>
                <div class="list_desc">
                <label for="">Địa điểm của bạn</label>
                </div>
            </div>
        </div>
        <div class="link_list">
            <div class="link_content">
                <div class="list_image">
                    <img src="/assets/images/chiase.png" />
                </div>
                <div class="list_desc">
                    <label for="">Chia sẻ hoặc nhúng bản đồ</label>
                </div>
            </div>
            <div class="link_content">
                <div class="list_image">
                    <img src="/assets/images/in.png" />
                </div>
                <div class="list_desc">
                    <label for="">In</label>
                </div>
            </div>
            <div class="list_option">
                <label for="">Thêm địa điểm bị thiếu</label>
            </div>
            <div class="list_option">
                <label for="">Thêm doanh nghiệp của bạn</label>
            </div>
        </div>
        <div class="link_list">
            <div class="list_option">
                <label for="">Mẹo và thủ thuật</label>
            </div>
            <div class="list_option">
                <label for="">Nhận trợ giúp</label>
            </div>
        </div>
        <div class="link_list" style="border-bottom: none">
            <div class="list_option">
                <label for="">2022 &copy Lê Hồng Phúc, Lý Anh Khoa</label>
            </div>
        </div>
    </div>
</div>
<div class="bars">
    <i class="fa-solid fa-bars"></i>
</div>