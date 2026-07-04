/**
 * External dependencies
 */
import Select from 'react-select';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    AlignmentControl,
    BlockControls,
    InspectorControls,
    AlignmentToolbar,
    MediaUpload,
} from '@wordpress/block-editor';

import {
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
    URLInput,
    Button,
    Dashicon,
    Sortable
} from '@wordpress/components';

import './editor.scss';

const { useState, useRef, useLayoutEffect } = wp.element;

import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => <span className='dragIcon'>::</span>);
const colorOptions = ['#ffffff', '#26335B', '#8E9FBC', '#8C1C13', '#3574DF'];


const normalizeColor = (color, fallback = '#ffffff') => {
    const value = color || fallback;

    if (/^#[0-9a-f]{3}$/i.test(value)) {
        return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    }

    return value;
};

const StyleColorControl = ({ label, value, defaultColor, onChange }) => (
    <div className="style-color-row">
        <span>{label}</span>
        <div className="style-color-actions">
            <Button
                className="style-color-reset"
                onClick={() => onChange(defaultColor)}
                label={__('Reset color', 'craft-blocks')}
            >
                <Dashicon icon="image-rotate" />
            </Button>
            <label className="style-color-swatch" style={{ backgroundColor: value || defaultColor }}>
                <input
                    type="color"
                    value={normalizeColor(value, defaultColor)}
                    onChange={(event) => onChange(event.target.value)}
                    aria-label={label}
                    list="slideshow-style-colors"
                />
            </label>
        </div>
    </div>
);

const SlideshowMediaControl = ({ label, value, buttonLabel, onSelect, onRemove }) => (
    <div className="slideshow-media-control">
        <label>{label}</label>
        <MediaUpload
            onSelect={(media) => onSelect(media.url)}
            allowedTypes={['image']}
            render={({ open }) => (
                <div className="slideshow-media-control__frame">
                    <div className="slideshow-media-control__preview">
                        {value && (
                            <>
                                <img src={value} alt="" />
                                <Button
                                    className="slideshow-media-control__remove"
                                    label={__('Remove image', 'craft-blocks')}
                                    onClick={onRemove}
                                >
                                    <Dashicon icon="dismiss" />
                                </Button>
                            </>
                        )}
                    </div>
                    <Button
                        className="slideshow-media-control__change"
                        label={buttonLabel}
                        onClick={open}
                    >
                        {buttonLabel}
                    </Button>
                </div>
            )}
        />
    </div>
);

// Define a sortable item component
const SortableItem = SortableElement(({ slide, i, updateSlide, removeProductSlide, switchTab, removeImage }) => (
    (
        <div className="slideshow slider-settings">
            <div className="slideTap">  <DragHandle /> <span className='slide-title'> {`Slide ${i + 1}`}</span>
                <Button onClick={() => removeProductSlide(i)} data-slide={i} type="button" className="components-button close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg></Button>
                <div className='toggleIcon'> <Dashicon icon="arrow-down" /> </div>
            </div>
            <div className='tab-content-wrap'>
                <div className="tabs">
                    <button onClick={() => switchTab(i, 'activeTab', 'content')} className={slide.activeTab === 'content' ? 'active' : ''}>
                        Content
                    </button>
                    <button onClick={() => switchTab(i, 'activeTab', 'styles')} className={`tab-button--style ${slide.activeTab === 'styles' ? 'active' : ''}`}>
                        Styles
                    </button>

                </div>
                <div className="tab-content">
                    {slide.activeTab === 'content' && (
                        <div className="content-section">
                            <SlideshowMediaControl
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
                            <TextControl
                                label="Sub Heading"
                                value={slide.subheading}
                                onChange={(value) => updateSlide(i, 'subheading', value)}
                            />
                            <TextareaControl
                                label="Description"
                                value={slide.description}
                                rows={5}
                                onChange={(value) => updateSlide(i, 'description', value)}
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
                            <div className="button-icon-field">
                                <span className="button-icon-label">1. Button Icon</span>
                                {slide.buttonicon ? (
                                    <div className="button-icon-preview">
                                        <img src={slide.buttonicon} alt="" />
                                        <Button onClick={(value) => removeImage(i, 'buttonicon')} className="button-icon-remove">
                                            <Dashicon icon="dismiss" />
                                        </Button>
                                    </div>
                                ) : (
                                    <MediaUpload
                                        onSelect={(value) => updateSlide(i, 'buttonicon', value.url)}
                                        allowedTypes={['image']}
                                        render={({ open }) => (
                                            <Button
                                                label={__('Button Icon', 'craft-blocks')}
                                                onClick={open}
                                                className="button-icon-upload"
                                            >Button Icon
                                            </Button>
                                        )}
                                    />
                                )}
                            </div>

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

                            <div className="button-icon-field">
                                <span className="button-icon-label">2. Button Icon</span>
                                {slide.buttonicon2 ? (
                                    <div className="button-icon-preview">
                                        <img src={slide.buttonicon2} alt="" />
                                        <Button onClick={(value) => removeImage(i, 'buttonicon2')} className="button-icon-remove">
                                            <Dashicon icon="dismiss" />
                                        </Button>
                                    </div>
                                ) : (
                                    <MediaUpload
                                        onSelect={(value) => updateSlide(i, 'buttonicon2', value.url)}
                                        allowedTypes={['image']}
                                        render={({ open }) => (
                                            <Button
                                                label={__('Button Icon', 'craft-blocks')}
                                                onClick={open}
                                                className="button-icon-upload"
                                            >Button Icon
                                            </Button>
                                        )}
                                    />
                                )}
                            </div>
                            {/* Button 3  */}
                            <TextControl
                                label="3. Button Text"
                                value={slide.buttontext3}
                                onChange={(value) => updateSlide(i, 'buttontext3', value)}
                            />
                            <TextControl
                                label="3. Button Link"
                                value={slide.buttonlink3}
                                onChange={(value) => updateSlide(i, 'buttonlink3', value)}
                            />

                            <div className="button-icon-field">
                                <span className="button-icon-label">3. Button Icon</span>
                                {slide.buttonicon3 ? (
                                    <div className="button-icon-preview">
                                        <img src={slide.buttonicon3} alt="" />
                                        <Button onClick={(value) => removeImage(i, 'buttonicon3')} className="button-icon-remove">
                                            <Dashicon icon="dismiss" />
                                        </Button>
                                    </div>
                                ) : (
                                    <MediaUpload
                                        onSelect={(value) => updateSlide(i, 'buttonicon3', value.url)}
                                        allowedTypes={['image']}
                                        render={({ open }) => (
                                            <Button
                                                label={__('Button Icon', 'craft-blocks')}
                                                onClick={open}
                                                className="button-icon-upload"
                                            >Button Icon
                                            </Button>
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {slide.activeTab === 'styles' && (
                        <div className="style-section">
                            <datalist id="slideshow-style-colors">
                                {colorOptions.map((color) => (
                                    <option key={color} value={color} />
                                ))}
                            </datalist>
                            <div className="button-style-group">
                                <h3>{__('1. Button', 'craft-blocks')}</h3>
                                <StyleColorControl label={__('Text Color', 'craft-blocks')} value={slide.textColor} defaultColor="#ffffff" onChange={(value) => updateSlide(i, 'textColor', value)} />
                                <StyleColorControl label={__('Background Color', 'craft-blocks')} value={slide.backgroundColor1} defaultColor="#26335B" onChange={(value) => updateSlide(i, 'backgroundColor1', value)} />
                                <StyleColorControl label={__('Icon Color', 'craft-blocks')} value={slide.iconColor} defaultColor="#ffffff" onChange={(value) => updateSlide(i, 'iconColor', value)} />
                            </div>
                            <div className="button-style-group">
                                <h3>{__('2. Button', 'craft-blocks')}</h3>
                                <StyleColorControl label={__('Text Color', 'craft-blocks')} value={slide.textColor2} defaultColor="#ffffff" onChange={(value) => updateSlide(i, 'textColor2', value)} />
                                <StyleColorControl label={__('Background Color', 'craft-blocks')} value={slide.backgroundColor2} defaultColor="#3574DF" onChange={(value) => updateSlide(i, 'backgroundColor2', value)} />
                                <StyleColorControl label={__('Icon Color', 'craft-blocks')} value={slide.iconColor2} defaultColor="#ffffff" onChange={(value) => updateSlide(i, 'iconColor2', value)} />
                            </div>
                            <div className="button-style-group">
                                <h3>{__('3. Button', 'craft-blocks')}</h3>
                                <StyleColorControl label={__('Text Color', 'craft-blocks')} value={slide.textColor3} defaultColor="#ffffff" onChange={(value) => updateSlide(i, 'textColor3', value)} />
                                <StyleColorControl label={__('Background Color', 'craft-blocks')} value={slide.backgroundColor3} defaultColor="#8E9FBC" onChange={(value) => updateSlide(i, 'backgroundColor3', value)} />
                                <StyleColorControl label={__('Icon Color', 'craft-blocks')} value={slide.iconColor3} defaultColor="#ffffff" onChange={(value) => updateSlide(i, 'iconColor3', value)} />
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
    const blockRef = useRef(null);
    const blockProps = useBlockProps({
        className: 'qhb-slideshow',
        ref: blockRef,
    });

    const { slides } = attributes;
    const [isSlideSorting, setIsSlideSorting] = useState(false);
    console.log('edit', slides)

    useLayoutEffect(() => {
        if (!Array.isArray(slides)) {
            return;
        }

        let shouldResetActiveTab = false;
        const slidesWithContentTab = slides.map((slide) => {
            if (slide && slide.activeTab !== 'content') {
                shouldResetActiveTab = true;
                return { ...slide, activeTab: 'content' };
            }

            return slide;
        });

        if (shouldResetActiveTab) {
            setAttributes({ slides: slidesWithContentTab });
        }
    }, []);

    const cleanSliderMarkup = (slider, itemSelector) => {
        if (!slider || !slider.length) {
            return;
        }

        if (slider.hasClass('slick-initialized') && typeof jQuery.fn.slick === 'function') {
            slider.slick('unslick');
        }

        slider.find('.slick-arrow, .slick-dots').remove();

        const slickList = slider.children('.slick-list');

        if (slickList.length) {
            const slideItems = slickList.find(itemSelector).detach();
            slickList.remove();
            slider.append(slideItems);
        }

        slider
            .removeClass('slick-initialized slick-slider slick-dotted')
            .removeAttr('style');

        slider.find(itemSelector)
            .removeClass('slick-slide slick-current slick-active slick-center')
            .removeAttr('aria-hidden tabindex role id')
            .removeAttr('style');
    };

    const destroySlideshowSliders = () => {
        if (typeof jQuery === 'undefined' || !blockRef.current) {
            return;
        }

        const slideshow = jQuery(blockRef.current);
        cleanSliderMarkup(slideshow.find('.product_slider-main'), '.product_slider_main-wrap');
        cleanSliderMarkup(slideshow.find('.product-slider-sub'), '.image-nav-slider');
    };

    useLayoutEffect(() => {
        if (
            !blockRef.current ||
            typeof jQuery === 'undefined' ||
            typeof jQuery.fn.slick !== 'function'
        ) {
            return;
        }

        const slideshow = jQuery(blockRef.current);
        const mainSlider = slideshow.find('.product_slider-main');
        const navSlider = slideshow.find('.product-slider-sub');

        cleanSliderMarkup(mainSlider, '.product_slider_main-wrap');
        cleanSliderMarkup(navSlider, '.image-nav-slider');

        if (!slides || slides.length <= 1 || !mainSlider.length || !navSlider.length) {
            return;
        }

        mainSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            asNavFor: navSlider,
        });

        navSlider.slick({
            slidesToShow: Math.min(6, slides.length),
            slidesToScroll: 1,
            asNavFor: mainSlider,
            dots: false,
            infinite: false,
            arrows: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: Math.min(3, slides.length),
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });

        return () => {
            destroySlideshowSliders();
        };
    }, [slides]);

    const removeImage = (index, key) => {
        const newSlides = [...attributes.slides];
        newSlides[index][key] = '';
        setAttributes({ slides: newSlides });
    };

    const updateSlide = (index, key, value) => {
        console.log(value, "updateSlide");
        const newSlides = [...attributes.slides];
        newSlides[index][key] = value;
        setAttributes({ slides: newSlides });
    };

    const addProductSlide = () => {
        console.log('addSlider');
        destroySlideshowSliders();
        setAttributes({
            slides: [...attributes.slides, { activeTab: 'content', image: '', heading: 'Heading', subheading: 'Subheading', description: 'Description', buttontext: 'Learn More', buttonlink: '', buttonicon: '', buttontext2: 'Learn More', buttonlink2: '', buttonicon2: '', buttontext3: 'Learn More', buttonlink3: '', buttonicon3: '', textColor: '#fff', backgroundColor1: '#26335B', iconColor: '#fff', textColor2: '#fff', backgroundColor2: '#3574DF', iconColor2: '#fff', textColor3: '#fff', backgroundColor3: '#8E9FBC', iconColor3: '#fff' }],
        });
    };

    const removeProductSlide = (index) => {
        console.log('removeSlider');
        destroySlideshowSliders();
        const newSlides = [...attributes.slides];
        newSlides.splice(index, 1);
        setAttributes({ slides: newSlides });
    };


    const switchTab = (index, key, value) => {
        const newSlides = [...attributes.slides];
        newSlides[index][key] = value;
        setAttributes({ slides: newSlides });
    };



    const onSortStart = () => {
        setIsSlideSorting(true);
        document.querySelectorAll('.slideshow-bodyPanel').forEach((panel) => {
            panel.classList.add('is-slide-sorting');
        });
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setIsSlideSorting(false);
        document.querySelectorAll('.slideshow-bodyPanel.is-slide-sorting').forEach((panel) => {
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
                    <div className={`slideshow-bodyPanel${isSlideSorting ? ' is-slide-sorting' : ''}`}>
                        <div className="slideshow-list-heading">{__('Sliders', 'craft-blocks')}</div>
                        <SortableList items={attributes.slides} onSortStart={onSortStart} onSortEnd={onSortEnd} updateSlide={updateSlide} removeProductSlide={removeProductSlide} switchTab={switchTab} removeImage={removeImage} helperClass='slideshow-sort-helper' useDragHandle />
                        <Button onClick={addProductSlide} className="components-button slideshow-add-item">{__('Add Item', 'craft-blocks')}</Button>
                    </div>
                </InspectorControls>
            </div>
            <div {...blockProps}>
                <div className="product_slider__wrap">
                    {slides && slides.length > 0 && (
                        <div className="product_slider-main">
                            {slides.map((slide, index) => (
                                <div className="product_slider_main-wrap" key={index}>
                                    <div className="inner">
                                        {slide.image && (
                                            <div className="image-wrap">
                                                <img src={slide.image} alt="slide_image" />
                                                <div className="buttons mobile-btn">
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
                                                            {slide.buttonlink2 && (
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
                                                    {slide.buttontext3 && (
                                                        <div className="slider-button">
                                                            {slide.buttonlink3 && (
                                                                <a href={slide.buttonlink3} style={{ backgroundColor: slide.backgroundColor3, color: slide.textColor3 }}>
                                                                    {slide.buttonicon3 && (
                                                                        <img src={slide.buttonicon3} style={{ backgroundColor: slide.iconColor3 }} />
                                                                    )}
                                                                    {slide.buttontext3}
                                                                </a>
                                                            )}
                                                            {!slide.buttonlink3 && (
                                                                <a href="javascript:void(0);" style={{ backgroundColor: slide.backgroundColor3, color: slide.textColor3 }}>
                                                                    {slide.buttonicon3 && (
                                                                        <img src={slide.buttonicon3} style={{ backgroundColor: slide.iconColor3 }} />
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
                                            {slide.heading && (
                                                <h2>{slide.heading}</h2>
                                            )}

                                            {slide.subheading && (
                                                <div className="sub-title">
                                                    <p>{slide.subheading}</p>
                                                </div>
                                            )}

                                            {slide.description && (
                                                <div className="content">
                                                    {slide.description}
                                                </div>
                                            )}
                                            <div className="buttons desktop-btn">
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
                                                        {slide.buttonlink2 && (
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
                                                {slide.buttontext3 && (
                                                    <div className="slider-button">
                                                        {slide.buttonlink3 && (
                                                            <a href={slide.buttonlink3} style={{ backgroundColor: slide.backgroundColor3, color: slide.textColor3 }}>
                                                                {slide.buttonicon3 && (
                                                                    <img src={slide.buttonicon3} style={{ backgroundColor: slide.iconColor3 }} />
                                                                )}
                                                                {slide.buttontext3}
                                                            </a>
                                                        )}
                                                        {!slide.buttonlink3 && (
                                                            <a href="javascript:void(0);" style={{ backgroundColor: slide.backgroundColor3, color: slide.textColor3 }}>
                                                                {slide.buttonicon3 && (
                                                                    <img src={slide.buttonicon3} style={{ backgroundColor: slide.iconColor3 }} />
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

                    {slides && slides.length > 0 && (
                        <div className="product-slider-sub">
                            {slides.map((slide, index) => (
                                <div className="image-nav-slider" key={index}>
                                    {slide.image && (
                                        <div className="image">
                                            <img src={slide.image} alt="slide_image_icon" />
                                        </div>
                                    )}
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
