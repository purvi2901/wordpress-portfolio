/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    AlignmentControl,
    BlockControls,
    InspectorControls,
    AlignmentToolbar,
    MediaUpload,
    URLInput
} from '@wordpress/block-editor';

import {
    TextControl,
    ToggleControl,
    PanelRow,
    SelectControl,
    Button,
    Dashicon,
    ColorIndicator,
    ColorPalette,
    Dropdown,
} from '@wordpress/components';
import { useState, useEffect, useLayoutEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
const DragHandle = sortableHandle(() => <span className='dragIcon'>::</span>);

export default function Edit({ attributes, setAttributes }) {
    // console.log('Edit ',products);
    const blockProps = useBlockProps({
        className: 'qhb-spareparts-slideshow',
    });

    const [selectedIds, setSelectedIds] = useState([]);
    const [defaultProductIds, setdefaultProductIds] = useState([17107, 17105, 17104]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeProductPanel, setActiveProductPanel] = useState(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isProductSorting, setIsProductSorting] = useState(false);
    const settingsPanelRef = useRef(null);
    const slideshowRef = useRef(null);
    const { selectedValues, selectedProduct1, selectedCategory1, headingContent, showSlider, sliderDuration, background_color, selectedMediaUrl, buttonText, buttonLink, selectedMediaButtonUrl } = attributes;
    const hasTitle = Boolean(headingContent && headingContent.trim());
    const hasImage = Boolean(selectedMediaUrl && selectedMediaUrl.trim());
    const hasButton = Boolean(buttonText && buttonText.trim());
    const categoryOptions = [
        { label: 'All Product', value: '' },
        ...categories.map((category) => ({
            label: category.name,
            value: category.id.toString(),
        })),
    ];
    const selectedCategory = categoryOptions.find((category) => category.value === selectedCategory1);
    const selectedCategoryLabel = selectedCategory ? selectedCategory.label : 'All Product';

    useEffect(() => {
        // Fetch categories from your WordPress backend
        apiFetch({ path: '/wc/store/products/categories?per_page=-1' }).then((response) => {
            setCategories(response);
        });
        selectedCategory1 &&
            apiFetch({ path: '/wc/store/products?category=' + selectedCategory1 }).then((response) => {
                setProducts(response);
            });

    }, []); // Fetch categories only once when the component mounts

    useEffect(() => {
        const closeOpenPanels = (event) => {
            if (!settingsPanelRef.current) {
                return;
            }

            if (!settingsPanelRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
                setActiveProductPanel(null);
                return;
            }

            if (!event.target.closest('.categoryDropdownPanel')) {
                setIsCategoryOpen(false);
            }

            if (!event.target.closest('.productDropdownPanel')) {
                setActiveProductPanel(null);
            }
        };

        document.addEventListener('mousedown', closeOpenPanels);

        return () => {
            document.removeEventListener('mousedown', closeOpenPanels);
        };
    }, []);

    const productsArray = [];
        console.log('Edit ',products);
    const SortableItem = SortableElement(({products, selectedValue, i, updateSlide, removeProductSlide, activeProductPanel, toggleProductPanel }) => {
        // Find the product object based on the selectedValue
        console.log(products,"PRO");
       
        const [productSearch, setProductSearch] = useState('');
        const productOptions = products.map((product) => ({
            label: product.sku ? `[${product.sku}] ${product.name}` : product.name,
            searchText: `${product.sku || ''} ${product.name}`.toLowerCase(),
            value: product.id.toString(),
        }));
        const productSearchValue = productSearch.trim().toLowerCase();
        const filteredProductOptions = productSearchValue
            ? productOptions.filter((option) => option.searchText.includes(productSearchValue))
            : productOptions;
        const selectedProduct = products.find(product => product.id.toString() === selectedValue);
        
        // If the selectedProduct is found, display its name; otherwise, display the selectedValue
        const displayName = selectedProduct ? (selectedProduct.sku ? `[${selectedProduct.sku}] ${selectedProduct.name}` : selectedProduct.name) : 'Please select product';
        
        return (
            <div className={`slider-settings${activeProductPanel === i ? ' activeslide' : ''}`}>
                <div className="slideTap">
                    <DragHandle />
                    <span className='slide-title'>{displayName}</span>
                    <Button onClick={(event) => { event.stopPropagation(); removeProductSlide(i); }} data-slide={i} type="button" className="components-button close" label={__('Remove product', 'craft-blocks')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
                            <path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
                        </svg>
                    </Button>
                    <Button
                        className='toggleIcon'
                        onClick={(event) => { event.stopPropagation(); toggleProductPanel(i); }}
                        aria-expanded={activeProductPanel === i}
                        label={activeProductPanel === i ? __('Close product settings', 'craft-blocks') : __('Open product settings', 'craft-blocks')}
                    >
                        <Dashicon icon="arrow-down" />
                    </Button>
                </div>
                <div className='tab-content-wrap'>
                    <div className='productSearchPicker'>
                        <input
                            className='productSearchInput'
                            type='search'
                            value={productSearch}
                            placeholder='Search by SKU or product name'
                            onChange={(event) => setProductSearch(event.target.value)}
                        />
                        <div className='productSearchResults' role='listbox' aria-label='Select Product'>
                            {filteredProductOptions.length ? (
                                filteredProductOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type='button'
                                        className={`productSearchOption${option.value === selectedValue ? ' is-selected' : ''}`}
                                        onClick={() => {
                                            updateSlide(i, option.value);
                                            setProductSearch('');
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))
                            ) : (
                                <span className='productSearchEmpty'>No products found</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    // Define a sortable container component
    const SortableList = SortableContainer(({ items, productsList, updateSlide, removeProductSlide, activeProductPanel, toggleProductPanel }) => {
        return (
            <div>
                {items.map((value, index) => (
                    <SortableItem key={`item-${index}-${value || 'empty'}`} index={index} i={index} products={productsList} selectedValue={value} updateSlide={updateSlide} removeProductSlide={removeProductSlide} activeProductPanel={activeProductPanel} toggleProductPanel={toggleProductPanel} />
                ))}
            </div>
        );
    });
    const fetchData = async () => {
        try {
            console.log('Selected Values:', selectedValues);
            const productIds = Array.isArray(selectedValues) ? selectedValues.filter(Boolean) : [];

            if (productIds.length > 0) {
                const responses = await Promise.all(
                    productIds.map((productId) =>
                        apiFetch({ path: '/wc/store/products/' + productId })
                    )
                );
                const productsArray = responses.map((response) => ({
                    id: response.id,
                    name: response.name,
                    permalink: response.permalink,
                    price: response.price_html,
                    sku: response.sku,
                    image: (response.images && response.images.length > 0) ? response.images[0].thumbnail : 'https://placehold.co/400x300/png',
                    description: response.description,
                    cartButton: response.add_to_cart.text,
                    cartUrl: response.add_to_cart.url,
                }));
                setAttributes({ selectedProduct1: productsArray });
            } else {
                setAttributes({ selectedProduct1: [] });
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedValues]);

    const destroySlideshow = (element = slideshowRef.current) => {
        if (
            !element ||
            typeof jQuery === 'undefined' ||
            typeof jQuery.fn.slick !== 'function'
        ) {
            return;
        }

        const slideshow = jQuery(element);

        if (slideshow.hasClass('slick-initialized')) {
            slideshow.slick('unslick');
        }
    };

    useLayoutEffect(() => {
        const slideshowElement = slideshowRef.current;
        const timer = setTimeout(() => {
            if (
                !slideshowElement ||
                !slideshowElement.isConnected ||
                typeof jQuery === 'undefined' ||
                typeof jQuery.fn.slick !== 'function'
            ) {
                return;
            }

            const slideshow = jQuery(slideshowElement);
            destroySlideshow(slideshowElement);

            if (!showSlider) {
                return;
            }

            slideshow.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: Number(sliderDuration) || 3000,
                prevArrow: '<button type="button" class="slick-prev"> &lt; </button>',
                nextArrow: '<button type="button" class="slick-next"> &gt; </button>',
                responsive: [{
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            destroySlideshow(slideshowElement);
        };
    }, [showSlider, sliderDuration, selectedProduct1]);

    const onChangeHeading = (value) => {
        setAttributes({ headingContent: value });
    };

    const toggleSlider = () => {
        destroySlideshow();
        setAttributes({ showSlider: !showSlider });
    };

    const handleNumberChange = (value) => {
        setAttributes({ sliderDuration: value });
    };

    const onMediaSelect = (media) => {
        if (media && media.url) {
            setAttributes({ selectedMediaUrl: media.url });
        }
    };

    const removeHeadingImage = () => {
        setAttributes({ selectedMediaUrl: null });
    };

    const onChangeButtonText = (newText) => {
        setAttributes({ buttonText: newText ? newText : '' });
    };

    const onMediaButtonSelect = (mediaButton) => {
        // Assuming you want to set the selected media URL to a block attribute
        if (mediaButton && mediaButton.url) {
            setAttributes({ selectedMediaButtonUrl: mediaButton.url });
        }
    };

    const removeButtonImage = () => {
        setAttributes({ selectedMediaButtonUrl: null });
    };

    const onChangeButtonLink = (newLink) => {
        setAttributes({ buttonLink: newLink ? newLink : '' });
    };

    const handleCategoryChange = (value) => {
        setAttributes({ selectedCategory1: value });
        apiFetch({ path: value ? '/wc/store/products?category=' + value : '/wc/store/products' }).then((response) => {
            setProducts(response);
        });
        setAttributes({ selectedValues: [''] });
        setIsCategoryOpen(false);
    };

    const addProductSelected = () => {
        // Add selected values from the dropdown to another constant
        if (jQuery('.spare-part-section .slick-initialized').length) {
            jQuery('.spare-part-section .all-spare-parts-slideshow').slick('unslick');
        }
        setAttributes({ selectedValues:[...selectedValues, '']}, () => {
            fetchData();
        });
    };
    const updateSlide = (index, value) => {
        if (jQuery('.spare-part-section .slick-initialized').length) {
            jQuery('.spare-part-section .all-spare-parts-slideshow').slick('unslick');
        }
        const newSlides = [...selectedValues];
        newSlides[index] = value;
        setAttributes({ selectedValues: newSlides }, () => {
            fetchData();
        });
    };
    const removeProductSlide = (index) => {
        if (jQuery('.spare-part-section .slick-initialized').length) {
            jQuery('.spare-part-section .all-spare-parts-slideshow').slick('unslick');
        }
        const newSlides = [...attributes.selectedValues];
        newSlides.splice(index, 1);
        setActiveProductPanel((currentIndex) => {
            if (currentIndex === null) {
                return null;
            }

            if (currentIndex === index) {
                return null;
            }

            return currentIndex > index ? currentIndex - 1 : currentIndex;
        });
        setAttributes({ selectedValues: newSlides }, () => {
            fetchData();
        });
    };

    const toggleProductPanel = (index) => {
        setActiveProductPanel((currentIndex) => currentIndex === index ? null : index);
    };

    const onSortStart = () => {
        destroySlideshow();
        setIsProductSorting(true);
        setActiveProductPanel(null);
        setIsCategoryOpen(false);

        if (settingsPanelRef.current) {
            settingsPanelRef.current.classList.add('is-product-sorting');
        }
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        destroySlideshow();
        setIsProductSorting(false);

        if (settingsPanelRef.current) {
            settingsPanelRef.current.classList.remove('is-product-sorting');
        }

        const newArray = [...attributes.selectedValues];
        const [removedElement] = newArray.splice(oldIndex, 1);
        newArray.splice(newIndex, 0, removedElement);
        const selectedProducts = Array.isArray(selectedProduct1) ? selectedProduct1 : [];
        const productsById = selectedProducts.reduce((productsMap, product) => {
            if (product && product.id) {
                productsMap[product.id.toString()] = product;
            }

            return productsMap;
        }, {});
        const sortedProducts = newArray.map((productId) => productsById[productId]).filter(Boolean);

        setActiveProductPanel((currentIndex) => {
            if (currentIndex === null || oldIndex === newIndex) {
                return currentIndex;
            }

            if (currentIndex === oldIndex) {
                return newIndex;
            }

            if (oldIndex < newIndex && currentIndex > oldIndex && currentIndex <= newIndex) {
                return currentIndex - 1;
            }

            if (oldIndex > newIndex && currentIndex >= newIndex && currentIndex < oldIndex) {
                return currentIndex + 1;
            }

            return currentIndex;
        });
        //setItems(newArray);        
        if (sortedProducts.length) {
            setAttributes({ selectedValues: newArray, selectedProduct1: sortedProducts });
        } else {
            setAttributes({ selectedValues: newArray });
        }
    };

    return (
        <>
            <InspectorControls>
                <div className={`settingPanelBody${isProductSorting ? ' is-product-sorting' : ''}`} ref={settingsPanelRef}>
                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__(
                                    'Title',
                                    'craft-blocks'
                                )}
                                value={headingContent}
                                onChange={(value) => { onChangeHeading(value) }}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='sliderShowclass'>
                        <fieldset>
                            <ToggleControl
                                label={__(
                                    'Slider',
                                    'craft-blocks'
                                )}
                                checked={showSlider}
                                onChange={toggleSlider}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='sliderDurationClass'>
                        <fieldset>
                            <TextControl
                                label={__('Slider Duration (ms)', 'craft-blocks')}
                                type="number"
                                value={sliderDuration}
                                onChange={(value) => { handleNumberChange(value) }}
                                min={1000}
                                max={4000}
                                step={100}
                                disabled={!showSlider}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='backgroundColorPanel'>
                        <span className='backgroundColorLabel'>
                            {__('Background Color', 'craft-blocks')}
                        </span>
                        <div className='backgroundColorControls'>
                            <Button
                                className='backgroundColorReset'
                                onClick={() => setAttributes({ background_color: '#F2F7FF' })}
                                label={__('Reset background color', 'craft-blocks')}
                            >
                                <Dashicon icon='image-rotate' />
                            </Button>
                            <Dropdown
                                className='backgroundColorDropdown'
                                contentClassName='backgroundColorPopover'
                                position='bottom right'
                                renderToggle={({ isOpen, onToggle }) => (
                                    <Button
                                        className='backgroundColorToggle'
                                        onClick={onToggle}
                                        aria-expanded={isOpen}
                                        label={__('Choose background color', 'craft-blocks')}
                                    >
                                        <ColorIndicator colorValue={background_color || '#F2F7FF'} />
                                    </Button>
                                )}
                                renderContent={() => (
                                    <ColorPalette
                                        value={background_color}
                                        onChange={(value) => setAttributes({ background_color: value || '#F2F7FF' })}
                                        clearable={false}
                                        colors={[
                                            { name: 'White', color: '#FFFFFF' },
                                            { name: 'Light Blue', color: '#F2F7FF' },
                                            { name: 'Navy', color: '#26335B' },
                                            { name: 'Gray Blue', color: '#8E9FBC' },
                                            { name: 'Red', color: '#8C1C13' },
                                            { name: 'Blue', color: '#3574DF' }
                                        ]}
                                    />
                                )}
                            />
                        </div>
                    </PanelRow>
                    <PanelRow className='ImageLeftPanel'>
                        <fieldset>
                            <span className='imageFieldLabel'>
                                {__('Image', 'craft-blocks')}
                            </span>
                            <div className='imagePreview'>
                                {selectedMediaUrl && (
                                    <div>
                                        <img
                                            className='imagePreviewMedia'
                                            src={selectedMediaUrl}
                                            alt="Selected Heading Image"
                                        />
                                        <Button
                                            className='imageRemoveButton'
                                            onClick={removeHeadingImage}
                                            label={__('Remove image', 'craft-blocks')}
                                        >
                                            <Dashicon icon="dismiss" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <MediaUpload
                                onSelect={(value) => { onMediaSelect(value) }}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button className='imageUploadButton' onClick={open}>
                                        {selectedMediaUrl ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                )}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow>
                        <fieldset>
                            <TextControl
                                label={__('Button Text', 'craft-blocks')}
                                value={buttonText}
                                onChange={(value) => { onChangeButtonText(value) }}
                                placeholder={__('Enter button text', 'craft-blocks')}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow>
                        <fieldset>
                            <URLInput
                                label={__('Button Link', 'craft-blocks')}
                                value={buttonLink}
                                onChange={(url, post) => onChangeButtonLink(url)}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='buttonIconPanel'>
                        <fieldset>
                            <span className='buttonIconLabel'>
                                {__('Button Icon', 'craft-blocks')}
                            </span>
                            <div className='buttonIconFrame'>
                                <div className='buttonIconPreview'>
                                    {selectedMediaButtonUrl && (
                                        <>
                                            <img className='buttonIconPreviewMedia' src={selectedMediaButtonUrl} alt="Selected Image" />
                                            <Button
                                                className='buttonIconRemoveButton'
                                                onClick={removeButtonImage}
                                                label={__('Remove button icon', 'craft-blocks')}
                                            >
                                                <Dashicon icon="dismiss" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                                <MediaUpload
                                    onSelect={(value) => { onMediaButtonSelect(value) }}
                                    allowedTypes={['image']}
                                    render={({ open }) => (
                                        <Button
                                            className='buttonIconUploadButton'
                                            label={selectedMediaButtonUrl ? __('Change Button Icon', 'craft-blocks') : __('Upload Button Icon', 'craft-blocks')}
                                            onClick={open}
                                        />
                                    )}
                                />
                            </div>
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='categoryDropdownPanel'>
                        <span className='categoryListLabel'>Select Category</span>
                        <button
                            type='button'
                            className={`categorySelectTrigger${isCategoryOpen ? ' is-open' : ''}`}
                            onClick={() => setIsCategoryOpen((isOpen) => !isOpen)}
                            aria-expanded={isCategoryOpen}
                        >
                            <span>{selectedCategoryLabel}</span>
                        </button>
                        {isCategoryOpen && (
                            <div className='categoryListBox' role='listbox' aria-label='Select Category'>
                                {categoryOptions.map((category) => (
                                    <button
                                        key={category.value || 'all-products'}
                                        type='button'
                                        className={`categoryListOption${category.value === selectedCategory1 ? ' is-selected' : ''}`}
                                        onClick={() => { handleCategoryChange(category.value) }}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </PanelRow>
                    <PanelRow className='productDropdownPanel'>
                        <span className='productListLabel'>Select Product</span>
                        <SortableList items={selectedValues} productsList={products} onSortStart={onSortStart} onSortEnd={onSortEnd} updateSlide={updateSlide} removeProductSlide={removeProductSlide} activeProductPanel={activeProductPanel} toggleProductPanel={toggleProductPanel} helperClass='spareparts-sort-helper' useDragHandle />
                    </PanelRow>
                    <PanelRow className='addItemsButtonPanel'>
                        <Button className='addItemsButton' onClick={addProductSelected}>
                            Add Item
                        </Button>
                    </PanelRow>
                </div>

            </InspectorControls>
            <div {...blockProps}>
                <section className="spare-part-section box-color">
                    <div className="container spare-part-container1" style={{ backgroundColor: background_color }}>
                        {(hasTitle || hasImage || hasButton) && (
                            <div className="spare-part-product-name">
                                {(hasTitle || hasImage) && (
                                    <div className="spare-part-product-name-wrap">
                                        {hasImage && (
                                            <div className="spare-part-product-img mobile-view-section">
                                                <img
                                                    src={selectedMediaUrl}
                                                    alt="Selected Media"
                                                    style={{ maxWidth: '100%' }}
                                                />
                                            </div>
                                        )}
                                        {hasTitle && (
                                            <div className="sp-product-name product-title">
                                                <h2>{headingContent}</h2>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {hasButton && (
                                    <div className="all-spare-parts-btn all-spare-btn desktop-view-section">
                                    <a href={buttonLink}>
                                        {buttonText}
                                        {selectedMediaButtonUrl && (
                                            <img
                                                src={selectedMediaButtonUrl}
                                                alt="Selected Media"

                                            />
                                        )}
                                    </a>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={`sp-wrap-slideshow${hasImage ? '' : ' without-featured-image'}`}>
                            {hasImage && (
                                <div className="spare-part-product-img desktop-view-section">
                                    <img
                                        src={selectedMediaUrl}
                                        alt="Selected Media"
                                        style={{ maxWidth: '100%' }}
                                    />
                                </div>
                            )}
                            {Array.isArray(selectedProduct1) && selectedProduct1.length > 0 && (
                                <div ref={slideshowRef} className={`all-spare-parts-slideshow ${showSlider ? 'is-slider-enabled' : 'is-slider-disabled'}`} data-showSlider={showSlider} data-sliderDuration={sliderDuration} >
                                    {selectedProduct1.filter(Boolean).map((product, index) => (
                                        <div className="spare-parts" key={`${product.id}-${index}`}>
                                            <div className="spare-parts-wrap">
                                                <div className="spare-part-img">
                                                    <div className="spare-part-product-popup abcs">
                                                        <a href={product.permalink}>
                                                            <img src={product.image} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="sp-sku txt-center">
                                                    <a href={product.permalink}><span>
                                                        {product.sku}
                                                    </span></a>
                                                </div>
                                                <div className="spare-part-name txt-center">
                                                    <a href={product.permalink}><span>
                                                        {product.name}
                                                    </span></a>
                                                </div>
                                                <div className="spare-part-price txt-center">
                                                    <div dangerouslySetInnerHTML={{ __html: product.price }} />
                                                </div>
                                                <div className="spare-part-buy-container test">
                                                    <div className="sp-add-to-cart-btn-wrap">
                                                        <input
                                                            type="hidden"
                                                            value="1"
                                                        />
                                                        <a href={product.cartUrl}><button type="submit" className="sp-add-to-cart-btn button alt" tabindex="-1">
                                                            {product.cartButton}</button></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {hasButton && (
                                <div className="all-spare-parts-btn all-spare-btn mobile-view-section">
                                    <a href={buttonLink}>
                                        {buttonText}
                                        {selectedMediaButtonUrl && (
                                            <img
                                                src={selectedMediaButtonUrl}
                                                alt="Selected Media"

                                            />
                                        )}
                                    </a>
                                </div>
                            )}
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}
