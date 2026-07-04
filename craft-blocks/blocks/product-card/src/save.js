import { RawHTML } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
const { ServerSideRender } = wp.serverSideRender;
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {slides, showSlider, title, showTitle, backgroundColor1, titleColor} = attributes;
    const sliderClass = slides.length === 1 ? 'single-slide' : '';
    const sliderShowClass = showSlider === true ? 'product-card-slider' : '';
    const blockProps = useBlockProps.save({ className: `qhb-product-card ${sliderClass}` });
	return ( <div {...blockProps}> 
        <div className="product-card-product-slider" style={{backgroundColor: backgroundColor1}}>
            {
                showTitle && (
                    <div className='product-card-section-title'>
                        <h3 style={{color:titleColor}}>
                            {title}
                        </h3>
                    </div>
                )
            }

            {slides && slides.length > 0 && (
                <div className={`product-card-product-slider-main ${sliderShowClass}`}>
                    {slides.map((slide, index) => (
                        <div className="product_slider_main-wrap" key={index}>
                            <div className="inner-product-card">
                                {slide.image && (
                                    <div className="image-wrap">
                                        <img src={slide.image} alt="slide_image" />
                                    </div>
                                )}
                                <div className="product_slider_content">
                                    {slide.heading && (
                                        <h2 style={{ color: slide.headingColor }}>{slide.heading}</h2>
                                    )}

                                    <div className="buttons">
                                        {slide.buttontext && (
                                            <div className="slider-button">
                                                {slide.buttonlink && (
                                                    <a href={slide.buttonlink} style={{ backgroundColor: slide.backgroundColor1, color: slide.textColor }}>
                                                        {slide.buttonicon && (
                                                            <img src={slide.buttonicon} style={{ backgroundColor: slide.iconColor }} />
                                                        )}
                                                        {slide.buttontext}
                                                    </a>
                                                )}
                                                {!slide.buttonlink && (
                                                    <a href="javascript:void(0);" style={{ backgroundColor: slide.backgroundColor1, color: slide.textColor }}>
                                                        {slide.buttonicon && (
                                                            <img src={slide.buttonicon} style={{ backgroundColor: slide.iconColor }} />
                                                        )}
                                                        {slide.buttontext}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                        {slide.buttontext2 && (
                                            <div className="slider-button">
                                                {slide.buttonlink2 && slide.buttonlink2.startsWith('[') && (
                                                    <>
                                                    <div className="popup-shortcode">
                                                        <a href="javascript:void(0);" className="popup-trigger" style={{ backgroundColor: slide.backgroundColor2, color: slide.textColor2 }}>
                                                            {slide.buttonicon2 && (
                                                                <img src={slide.buttonicon2} style={{ backgroundColor: slide.iconColor2 }} />
                                                            )}
                                                            {slide.buttontext2}
                                                        </a>
                                                        <RawHTML>{ slide.buttonlink2 }</RawHTML>
                                                    </div>
                                                    </>
                                                 )}
                                                {slide.buttonlink2 && !slide.buttonlink2.startsWith('[') && (
                                                    <a href={slide.buttonlink2} style={{ backgroundColor: slide.backgroundColor2, color: slide.textColor2 }}>
                                                        {slide.buttonicon2 && (
                                                            <img src={slide.buttonicon2} style={{ backgroundColor: slide.iconColor2 }} />
                                                        )}
                                                        {slide.buttontext2}
                                                    </a>
                                                )}
                                                {!slide.buttonlink2 && (
                                                    <a href="javascript:void(0);" style={{ backgroundColor: slide.backgroundColor2, color: slide.textColor2 }}>
                                                        {slide.buttonicon2 && (
                                                            <img src={slide.buttonicon2} style={{ backgroundColor: slide.iconColor2 }} />
                                                        )}
                                                        {slide.buttontext2}
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

        </div>
        {!slides || !slides.length > 0 && (
            <div className="product_slider__wrap">
                <p>{__('No slide found. Please add a new slide.', 'craft-blocks')}</p>
            </div>
        )}
    </div> );
}
