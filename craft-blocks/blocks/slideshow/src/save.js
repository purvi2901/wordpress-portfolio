import { createElement } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {slides} = attributes;
    console.log('save',slides)
	const blockProps = useBlockProps.save({
	    className: 'qhb-slideshow',
	});
	return ( <div {...blockProps}> 
        <div className="product_slider__wrap">
            {slides  && slides.length > 0 && (
                <div className="product_slider-main">
                    {slides.map((slide, index) => (
                        <div className="product_slider_main-wrap"  key={index}>
                            <div className="inner">
                                {slide.image &&(
                                    <div className="image-wrap">
                                        <img src={slide.image} alt="slide_image" />
                                        <div className="buttons mobile-btn">
                                            {slide.buttontext &&(
                                                <div className="slider-button">
                                                    {slide.buttonlink &&( 
                                                        <a href={slide.buttonlink} style={{backgroundColor:slide.backgroundColor1, color:slide.iconColor}}>
                                                            {slide.buttonicon &&(
                                                                <img src={slide.buttonicon} style={{backgroundColor:slide.iconColor}} />
                                                            )}    
                                                            {slide.buttontext}
                                                        </a>
                                                    )}
                                                    {!slide.buttonlink &&( 
                                                        <a href="javascript:void(0);" style={{backgroundColor:slide.backgroundColor1, color:slide.iconColor}}>
                                                            {slide.buttonicon &&(
                                                                <img src={slide.buttonicon} style={{backgroundColor:slide.iconColor}}/>
                                                            )}    
                                                            {slide.buttontext}
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                            {slide.buttontext2 &&(
                                                <div className="slider-button">
                                                    {slide.buttonlink2 &&( 
                                                        <a href={slide.buttonlink2} style={{backgroundColor:slide.backgroundColor2, color:slide.iconColor2}}>
                                                            {slide.buttonicon2 &&(
                                                                <img src={slide.buttonicon2} style={{backgroundColor:slide.iconColor2}}/>
                                                            )}    
                                                            {slide.buttontext2}
                                                        </a>
                                                    )}
                                                    {!slide.buttonlink2 &&( 
                                                        <a href="javascript:void(0);" style={{backgroundColor:slide.backgroundColor2, color:slide.iconColor}}>
                                                            {slide.buttonicon2 &&(
                                                                <img src={slide.buttonicon2} style={{backgroundColor:slide.iconColor2}} />
                                                            )}    
                                                            {slide.buttontext2}
                                                        </a>     
                                                    )}
                                                </div>
                                            )}
                                            {slide.buttontext3 &&(
                                                <div className="slider-button">
                                                    {slide.buttonlink3 &&( 
                                                        <a href={slide.buttonlink3} style={{backgroundColor:slide.backgroundColor3, color:slide.iconColor3}}>
                                                            {slide.buttonicon3 &&(
                                                                <img src={slide.buttonicon3} style={{backgroundColor:slide.iconColor3}} />
                                                            )}    
                                                            {slide.buttontext3}
                                                        </a>
                                                    )}
                                                    {!slide.buttonlink3 &&( 
                                                        <a href="javascript:void(0);" style={{backgroundColor:slide.backgroundColor3, color:slide.iconColor3}}>
                                                            {slide.buttonicon3 &&(
                                                                <img src={slide.buttonicon3} style={{backgroundColor:slide.iconColor3}} />
                                                            )}    
                                                            {slide.buttontext3}
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="product_slider_content">
                                    {slide.heading &&(
                                        <h2>{slide.heading}</h2>
                                    )}

                                    {slide.subheading &&(
                                        <div className="sub-title">
                                            <p>{slide.subheading}</p>
                                        </div>
                                    )}
                                    
                                    {slide.description &&(
                                        <div className="content">
                                            {slide.description}
                                        </div>
                                    )}
                                    <div className="buttons desktop-btn">
                                        {slide.buttontext &&(
                                            <div className="slider-button">
                                                {slide.buttonlink &&( 
                                                    <a href={slide.buttonlink} style={{backgroundColor:slide.backgroundColor1, color:slide.iconColor}}>
                                                        {slide.buttonicon &&(
                                                            <img src={slide.buttonicon} style={{backgroundColor:slide.iconColor}} />
                                                        )}    
                                                        {slide.buttontext}
                                                    </a>
                                                )}
                                                {!slide.buttonlink &&( 
                                                    <a href="javascript:void(0);" style={{backgroundColor:slide.backgroundColor1, color:slide.iconColor}}>
                                                        {slide.buttonicon &&(
                                                            <img src={slide.buttonicon} style={{backgroundColor:slide.iconColor}}/>
                                                        )}    
                                                        {slide.buttontext}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                        {slide.buttontext2 &&(
                                            <div className="slider-button">
                                                {slide.buttonlink2 &&( 
                                                    <a href={slide.buttonlink2} style={{backgroundColor:slide.backgroundColor2, color:slide.iconColor2}}>
                                                        {slide.buttonicon2 &&(
                                                            <img src={slide.buttonicon2} style={{backgroundColor:slide.iconColor2}}/>
                                                        )}    
                                                        {slide.buttontext2}
                                                    </a>
                                                )}
                                                {!slide.buttonlink2 &&( 
                                                    <a href="javascript:void(0);" style={{backgroundColor:slide.backgroundColor2, color:slide.iconColor}}>
                                                        {slide.buttonicon2 &&(
                                                            <img src={slide.buttonicon2} style={{backgroundColor:slide.iconColor2}} />
                                                        )}    
                                                        {slide.buttontext2}
                                                    </a>     
                                                )}
                                            </div>
                                        )}
                                        {slide.buttontext3 &&(
                                            <div className="slider-button">
                                                {slide.buttonlink3 &&( 
                                                    <a href={slide.buttonlink3} style={{backgroundColor:slide.backgroundColor3, color:slide.iconColor3}}>
                                                        {slide.buttonicon3 &&(
                                                            <img src={slide.buttonicon3} style={{backgroundColor:slide.iconColor3}} />
                                                        )}    
                                                        {slide.buttontext3}
                                                    </a>
                                                )}
                                                {!slide.buttonlink3 &&( 
                                                    <a href="javascript:void(0);" style={{backgroundColor:slide.backgroundColor3, color:slide.iconColor3}}>
                                                        {slide.buttonicon3 &&(
                                                            <img src={slide.buttonicon3} style={{backgroundColor:slide.iconColor3}} />
                                                        )}    
                                                        {slide.buttontext3}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {slides  && slides.length > 0 && (
                <div className="product-slider-sub">
                    {slides.map((slide, index) => (
                        <div className="image-nav-slider">
                            {slide.image &&(
                                <div className="image">
                                    <img src={slide.image} alt="slide_image_icon" />
                                </div>
                            )}
                        </div>    
                    ))}
                </div>
            )}
        </div>
    </div> );
}
