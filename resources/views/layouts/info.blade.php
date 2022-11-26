<div class="container">
    <div class="feature_menu">
            <div class="feature_img">
                <img src="/assets/images/default_img.png">
            </div>
            <div class="link_list">
                <div class="link_content">
                    <h3 id="feature_name">Name</h3>
                </div>
                <div class="link_content">
                    <span id="feature_type">Type</span>
                </div>
            </div>
            <div class="link_list">
                <div class="link_content">
                    <p id="feature_address">Address</p>
                </div>
                <div class="link_content">
                    <p id="feature_website">Website</p>
                </div>
                <div class="link_content">
                    <p id="feature_phone">Phone number</p>
                </div>
            </div>
            <?php if (Auth::check()) :  ?>
                <?php $user=Auth::user(); if ($user->role == "admin") : ?>
                    <div class="link_list fbutton">
                        <button type="button" class="featureEdit"><i class="fa-regular fa-pen-to-square"></i></button>
                        <p></p>
                        <button type="button" class="featureDelete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
    </div>
    <div class="fcontrol">
        <button><</button>
    </div>
</div>