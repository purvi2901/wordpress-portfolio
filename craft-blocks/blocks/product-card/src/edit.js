/**
 * External dependencies
 */
import Select from 'react-select';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';
import {
    useBlockProps,
    RichText,
    AlignmentControl,
    BlockControls,
    InspectorControls,
    AlignmentToolbar,
    MediaUpload,
    ColorPalette
} from '@wordpress/block-editor';

import {
    TextControl,
    ToggleControl,
    PanelBody,
    PanelRow,
    SelectControl,
    URLInput,
    Button,
    Dashicon,
    Sortable,
    Dropdown,
} from '@wordpress/components';

import './editor.scss';
import ServerSideRender from '@wordpress/server-side-render';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
const DragHandle = sortableHandle(() => <span className='dragIcon'>::</span>);
const productCardColors = [{ color: '#fff' }, { color: '#26335B' }, { color: '#8E9FBC' }, { color: '#8C1C13' }, { color: '#3574DF' }];



const ProductCardColorControl = ({ label, value, onChange }) => (
    <div className="product-card-color-control">
        <span className="product-card-color-control__label">{label}</span>
        <div className="product-card-color-control__actions">
            <Button
                className="product-card-color-control__reset"
                label={__('Reset color', 'craft-blocks')}
                onClick={() => onChange('')}
            >
                <Dashicon icon="image-rotate" />
            </Button>
            <Dropdown
                className="product-card-color-control__dropdown"
                contentClassName="product-card-color-control__popover"
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        className="product-card-color-control__swatch"
                        label={label}
                        onClick={onToggle}
                        aria-expanded={isOpen}
                    >
                        <span style={{ backgroundColor: value || 'transparent' }} />
                    </Button>
                )}
                renderContent={() => (
                    <ColorPalette
                        colors={productCardColors}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    </div>
);

const ProductCardMediaControl = ({ label, value, buttonLabel, onSelect, onRemove, isIcon = false }) => (
    <div className={`product-card-media-control ${isIcon ? 'is-icon' : ''}`}>
        <label>{label}</label>
        <MediaUpload
            onSelect={(media) => onSelect(media.url)}
            allowedTypes={['image']}
            render={({ open }) => (
                <>
                    <div className="product-card-media-control__frame">
                        <div className="product-card-media-control__preview">
                            {value && (
                                <>
                                    <img src={value} alt="" />
                                    <Button
                                        className="product-card-media-control__remove"
                                        label={__('Remove image', 'craft-blocks')}
                                        onClick={onRemove}
                                    >
                                        <Dashicon icon="dismiss" />
                                    </Button>
                                </>
                            )}
                        </div>
                        <Button
                            className="product-card-media-control__change"
                            label={buttonLabel}
                            onClick={open}
                        >
                            {!isIcon && buttonLabel}
                        </Button>
                    </div>
                </>
            )}
        />
    </div>
);

// Define a sortable item component
const SortableItem = SortableElement(({ slide, i, updateSlide, removeProductSlide, switchTab, removeImage }) => (
    (
        <div className="slider-settings">
            <div className="slideTap"><DragHandle /> <span className='slide-title'>{slide.heading}</span>
                <Button onClick={() => removeProductSlide(i)} data-slide={i} type="button" className="components-button close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg></Button>
                <div className='toggleIcon'> <Dashicon icon="arrow-down" /> </div>
            </div>
            <div className='tab-content-wrap'>
                <div className="tabs">
                    <button onClick={() => switchTab(i, 'activeTab', 'content')} className={slide.activeTab === 'content' ? 'active' : ''}>
                        Content
                    </button>
                    <button onClick={() => switchTab(i, 'activeTab', 'styles')} className={`tab-button--style ${slide.activeTab === 'styles' ? 'active' : ''}`}>
                        Style
                    </button>

                </div>
                <div className="tab-content">
                    {slide.activeTab === 'content' && (
                        <div className="content-section">
                            <ProductCardMediaControl
                                label={__('Image', 'craft-blocks')}
                                value={slide.image}
                                buttonLabel={slide.image ? __('Change Image', 'craft-blocks') : __('Upload Image', 'craft-blocks')}
                                onSelect={(value) => updateSlide(i, 'image', value)}
                                onRemove={() => removeImage(i, 'image')}
                            />
                            <TextControl
                                label="Heading"
                                value={slide.heading}
                                onChange={(value) => updateSlide(i, 'heading', value)}
                            />
                            {/* Button 1  */}
                            <TextControl
                                label="1. Button Text"
                                value={slide.buttontext}
                                onChange={(value) => updateSlide(i, 'buttontext', value)}
                            />
                            <TextControl
                                label="1. Button Link"
                                value={slide.buttonlink}
                                onChange={(value) => updateSlide(i, 'buttonlink', value)}
                            />
                            <ProductCardMediaControl
                                label={__('1. Button Icon', 'craft-blocks')}
                                value={slide.buttonicon}
                                buttonLabel={slide.buttonicon ? __('Change Icon', 'craft-blocks') : __('Upload Icon', 'craft-blocks')}
                                onSelect={(value) => updateSlide(i, 'buttonicon', value)}
                                onRemove={() => removeImage(i, 'buttonicon')}
                                isIcon
                            />

                            {/* Button 2  */}
                            <TextControl
                                label="2. Button Text"
                                value={slide.buttontext2}
                                onChange={(value) => updateSlide(i, 'buttontext2', value)}
                            />
                            <TextControl
                                label="2. Button Link"
                                value={slide.buttonlink2}
                                onChange={(value) => updateSlide(i, 'buttonlink2', value)}
                            />
                            <ProductCardMediaControl
                                label={__('2. Button Icon', 'craft-blocks')}
                                value={slide.buttonicon2}
                                buttonLabel={slide.buttonicon2 ? __('Change Icon', 'craft-blocks') : __('Upload Icon', 'craft-blocks')}
                                onSelect={(value) => updateSlide(i, 'buttonicon2', value)}
                                onRemove={() => removeImage(i, 'buttonicon2')}
                                isIcon
                            />

                        </div>
                    )}

                    {slide.activeTab === 'styles' && (
                        <div className="style-section">
                            <ProductCardColorControl
                                label={__('Heading Color', 'craft-blocks')}
                                value={slide.headingColor}
                                onChange={(value) => updateSlide(i, 'headingColor', value)}
                            />
                            <div className="product-card-style-group">
                                <div className="product-card-style-group__title">1. Button</div>
                                <ProductCardColorControl label={__('Text Color', 'craft-blocks')} value={slide.textColor} onChange={(value) => updateSlide(i, 'textColor', value)} />
                                <ProductCardColorControl label={__('Background Color', 'craft-blocks')} value={slide.backgroundColor1} onChange={(value) => updateSlide(i, 'backgroundColor1', value)} />
                                <ProductCardColorControl label={__('Icon Color', 'craft-blocks')} value={slide.iconColor} onChange={(value) => updateSlide(i, 'iconColor', value)} />
                            </div>
                            <div className="product-card-style-group">
                                <div className="product-card-style-group__title">2. Button</div>
                                <ProductCardColorControl label={__('Text Color', 'craft-blocks')} value={slide.textColor2} onChange={(value) => updateSlide(i, 'textColor2', value)} />
                                <ProductCardColorControl label={__('Background Color', 'craft-blocks')} value={slide.backgroundColor2} onChange={(value) => updateSlide(i, 'backgroundColor2', value)} />
                                <ProductCardColorControl label={__('Icon Color', 'craft-blocks')} value={slide.iconColor2} onChange={(value) => updateSlide(i, 'iconColor2', value)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
));

// Define a sortable container component
const SortableList = SortableContainer(({ items, updateSlide, removeProductSlide, switchTab, removeImage }) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} i={index} slide={value} updateSlide={updateSlide} removeProductSlide={removeProductSlide} switchTab={switchTab} removeImage={removeImage} />
            ))}
        </div>
    );
});

export default function Edit({ attributes, setAttributes }) {
    const { slides, showSlider, title, showTitle, backgroundColor1, titleColor } = attributes;
    const sliderClass = slides.length === 1 ? 'single-slide' : '';
    const blockRef = useRef();
    const blockProps = useBlockProps({ ref: blockRef, className: `qhb-product-card ${sliderClass}` });
    const sliderShowClass = showSlider === true ? 'product-card-slider' : '';
    const [isSlideSorting, setIsSlideSorting] = useState(false);

    const cleanSliderMarkup = (slider) => {
        if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick');
        }

        slider.find('.slick-arrow, .slick-dots').remove();

        const slickList = slider.children('.slick-list');

        if (slickList.length) {
            const slideItems = slickList.find('.product_slider_main-wrap').detach();
            slickList.remove();
            slider.append(slideItems);
        }

        slider
            .removeClass('slick-initialized slick-slider slick-dotted')
            .removeAttr('style');

        slider.find('.product_slider_main-wrap')
            .removeClass('slick-slide slick-current slick-active')
            .removeAttr('aria-hidden tabindex role id')
            .removeAttr('style');
    };

    useEffect(() => {
        const positionTimers = [];
        let frameId;

        const timer = setTimeout(() => {
            if (!blockRef.current || !window.jQuery || !window.jQuery.fn.slick) {
                return;
            }

            const slider = window.jQuery(blockRef.current).find('.product-card-product-slider-main');

            if (!slider.length) {
                return;
            }

            cleanSliderMarkup(slider);

            if (!showSlider || slides.length <= 1) {
                return;
            }

            const slideCount = slider.find('.product_slider_main-wrap').length;
            const slidesToShow = slideCount >= 3 ? 3 : slideCount;

            slider.slick({
                slidesToShow,
                slidesToScroll: 1,
                arrows: true,
                autoplay: false,
                infinite: false,
                autoplaySpeed: 2000,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }
                ]
            });

            const setSliderPosition = () => {
                if (slider.hasClass('slick-initialized')) {
                    slider.slick('setPosition');
                }
            };

            if (window.requestAnimationFrame) {
                frameId = window.requestAnimationFrame(setSliderPosition);
            } else {
                positionTimers.push(setTimeout(setSliderPosition, 0));
            }

            positionTimers.push(setTimeout(setSliderPosition, 150));
            positionTimers.push(setTimeout(setSliderPosition, 350));
        }, 0);

        return () => {
            clearTimeout(timer);
            positionTimers.forEach(clearTimeout);

            if (frameId && window.cancelAnimationFrame) {
                window.cancelAnimationFrame(frameId);
            }

            if (!blockRef.current || !window.jQuery || !window.jQuery.fn.slick) {
                return;
            }

            const slider = window.jQuery(blockRef.current).find('.product-card-product-slider-main');

            cleanSliderMarkup(slider);
        };
    }, [showSlider, slides]);
    
    const toggleSlider = () => {
        setAttributes({ showSlider: !showSlider });
    };
    const toggleTitle = () => {
        setAttributes({ showTitle: !showTitle });
    };
    const onChangeHeading = (value) => {
        setAttributes({ title: value });
    };
    const removeImage = (index, key) => {
        const newSlides = [...attributes.slides];
        newSlides[index][key] = '';
        setAttributes({ slides: newSlides });
    };

    const updateSlide = (index, key, value) => {
   
        const newSlides = [...attributes.slides];
        newSlides[index][key] = value;
        setAttributes({ slides: newSlides });
    };

    const addProductSlide = () => {
        const uniqueSlideId = `slide-${Date.now()}`;
        if (jQuery('.qhb-product-card .product-card-slider.slick-initialized').length) {
            jQuery('.qhb-product-card .product-card-slider').slick('unslick');
        }
        setAttributes({
            slides: [...attributes.slides, { id: uniqueSlideId,activeTab: 'content', image: '', heading: 'Heading', headingColor: '', buttontext: 'Learn More', buttonlink: '', buttonicon: '', buttontext2: 'Buy Now', buttonlink2: '', buttonicon2: '',"backgroundColor1": "#26335B","iconColor":"","textColor": "#fff","textColor2": "#fff","backgroundColor2": "#3574DF","iconColor2":""}],
        });
    };

    const removeProductSlide = (index) => {
     
        if (jQuery('.qhb-product-card .product-card-slider.slick-initialized').length) {
            jQuery('.qhb-product-card .product-card-slider').slick('unslick');
        }
        const newSlides = [...attributes.slides];
        newSlides.splice(index, 1);
        setAttributes({ slides: newSlides });
    };


    const switchTab = (index, key, value) => {
        const newSlides = [...attributes.slides];
        newSlides[index][key] = value;
        setAttributes({ slides: newSlides });
    };

    const destroyProductCardSlider = () => {
        if (!window.jQuery || !window.jQuery.fn.slick) {
            return;
        }

        const slider = blockRef.current
            ? window.jQuery(blockRef.current).find('.product-card-product-slider-main')
            : window.jQuery('.qhb-product-card .product-card-product-slider-main');

        if (slider.length) {
            cleanSliderMarkup(slider);
        }
    };

    const onSortStart = () => {
        destroyProductCardSlider();
        setIsSlideSorting(true);
        document.querySelectorAll('.product-card-bodyPanel').forEach((panel) => {
            panel.classList.add('is-slide-sorting');
        });
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        destroyProductCardSlider();
        setIsSlideSorting(false);
        document.querySelectorAll('.product-card-bodyPanel.is-slide-sorting').forEach((panel) => {
            panel.classList.remove('is-slide-sorting');
        });
        const newArray = [...attributes.slides];
        const [removedElement] = newArray.splice(oldIndex, 1);
        newArray.splice(newIndex, 0, removedElement);
        //setItems(newArray);        
        setAttributes({ slides: newArray });
    };


    return (
        <>
            <div className="settings-right">
                <InspectorControls>
                    <PanelBody className={`product-card-bodyPanel${isSlideSorting ? ' is-slide-sorting' : ''}`}>
                        <PanelRow className='custom-sliderShowclass'>
                            <fieldset>
                                <ToggleControl
                                    label={__(
                                        'Slider View',
                                        'craft-blocks'
                                    )}
                                    checked={showSlider}
                                    onChange={toggleSlider}
                                    help={__(
                                        'Toggle between Grid View and Slider View.',
                                        'craft-blocks'
                                    )}
                                />

                            </fieldset>
                        </PanelRow>
                        <PanelRow className='custom-titleShowclass'>
                            <fieldset>
                                <ToggleControl
                                    label={__(
                                        'Title',
                                        'craft-blocks'
                                    )}
                                    checked={showTitle}
                                    onChange={toggleTitle}

                                />
                                {showTitle &&
                                    <TextControl
                                        value={title}
                                        onChange={(value) => { onChangeHeading(value) }}
                                    />
                                }
                            </fieldset>
                        </PanelRow>
                        <PanelRow className='custom-titleColor'>
                            <ProductCardColorControl
                                label={__('Title Color', 'craft-blocks')}
                                value={titleColor}
                                onChange={(value) => setAttributes({ titleColor: value })}
                            />
                        </PanelRow>
                        <PanelRow className='custom-backGroundPanel'>
                            <ProductCardColorControl
                                label={__('Background Color', 'craft-blocks')}
                                value={backgroundColor1}
                                onChange={(value) => setAttributes({ backgroundColor1: value })}
                            />
                        </PanelRow>

                        <PanelRow title="Items">
                            <label htmlFor="block-options">{__('Items', 'craft-blocks')}</label>
                        </PanelRow>
                        <SortableList items={attributes.slides} onSortStart={onSortStart} onSortEnd={onSortEnd} updateSlide={updateSlide} removeProductSlide={removeProductSlide} switchTab={switchTab} removeImage={removeImage} helperClass='product-card-sort-helper' useDragHandle />
                    </PanelBody>

                    <Button onClick={addProductSlide} className="components-button product-card-add-item">{__('Add Item', 'craft-blocks')}</Button>
                </InspectorControls>
            </div>
            <div {...blockProps} >
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
            </div>
        </>
    );
}
