<div class="main_header">
    <div class="search_box">
        <div class="bars">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div class="input">
            <input type="text" placeholder="Tìm kiếm địa điểm" />
        </div>
        <div class="search">
            <i class="fa-sharp fa-solid fa-magnifying-glass search_icon"></i>
        </div>
    </div>
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
<div class="user">
        <?php if (Auth::check()) :  ?>
            <div class="dropdown">
                <i class="fa-solid fa-circle-user"></i>
                <div class="dropdown-content">
                    <?php $user=Auth::user() ?? null; if ($user->role == "admin") : ?>
                        <a id="admin" href="/admin">Map Editor</a>
                        <hr>
                    <?php endif; ?>
                    <a role="button" href="/logout">Log Out</a>
                </div>
            </div>
        <?php else : ?>
            <a id="signin" href="/login">Log In</a>
        <?php endif; ?>
    </div>