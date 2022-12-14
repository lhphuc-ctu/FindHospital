<div class="infoContainer">
    <div class="feature_menu">
            <div class="feature_img">
                <img id="imginfo" src="/assets/images/default_img.png">
            </div>
            <div class="info_list">
                <div class="info_content">
                    <h3 id="feature_name">Name</h3>
                </div>
                <div class="info_content">
                    <span id="feature_type">Type</span>
                </div>
            </div>
            <div class="info_list">
                <div class="info_content">
                    <i class="fa-solid fa-location-dot"></i>
                    <p id="feature_address">Address</p>
                </div>
                <div class="info_content">
                    <i class="fa-solid fa-globe"></i>
                    <a  id="feature_website" href="#">Không có website</a>
                    
                </div>
                <div class="info_content">
                    <i class="fa-solid fa-phone"></i>
                    <p id="feature_phone">Phone number</p>
                </div>
            </div>

            <?php if(strpos(URL::current(),"admin")) :?>
                <?php if (Auth::check()) :  ?>
                    <?php $user=Auth::user(); if ($user->role == "admin") : ?>
                        <div class="info_list fbutton">
                            <button type="button" class="featureEdit" value="0"><i class="fa-regular fa-pen-to-square"></i></button>
                            <p></p>
                            <button type="button" class="featureDelete"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    <?php endif; ?>
                <?php endif; ?>
            <?php endif; ?>
    </div>
    <div class="fcontrol">
        <button><</button>
    </div>
</div>