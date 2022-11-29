<div class="addContainer">
    <div class="addfeature_menu">
        <form class="addform" method="post" enctype="multipart/form-data">
            <div class="feature_img">
                <img id="imgedit" src="/assets/images/default_img.png">
            </div>
            <div class="link_list">
                <div class="link_content">
                    <input type="file" id="img" name="img" class="input-field">
                    <input type="hidden" id="img_name">
                </div>
            </div>
            <div class="link_list">
                <div class="link_content">
                    <input type="text" id="name" class="input-field" placeholder="Tên địa điểm">
                </div>
                <div class="link_content">
                    <input type="text" id="type" class="input-field" placeholder="Loại địa điểm">
                </div>
            </div>
            <div class="link_list">
                <div class="link_content">
                    <input type="text" id="address" class="input-field" placeholder="Địa chỉ">
                </div>
                <div class="link_content">
                    <input type="text" id="website" class="input-field" placeholder="Website">
                </div>
                <div class="link_content">
                    <input type="text" id="phone_number" class="input-field" placeholder="Thông tin liên lạc">
                </div>
            </div>
            <input class="addbutton" type="button" value="Nhập" id="submit">
            <input class="addbutton" type="hidden" value="Chỉnh sửa" id="edit">
        </form>
    </div>
    <div class="addfcontrol">
        <button><</button>
    </div>
</div>