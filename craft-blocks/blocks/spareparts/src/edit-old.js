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
    URLInput,
    PanelColorSettings
} from '@wordpress/block-editor';

import {
    TextControl,
    ToggleControl,
    PanelBody,
    PanelRow,
    SelectControl,
    Button,
    Dashicon,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';
// import 'select2/dist/css/select2.min.css';
// import 'select2/dist/js/select2.full.min.js';
import Select2Dropdown from './Select2Dropdown';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps({
        className: 'qhb-spareparts-slideshow',
    });

    const [selectedIds, setSelectedIds] = useState([]);
    const [defaultProductIds, setdefaultProductIds] = useState([17107, 17105, 17104]);
    //  console.log(attributes,'attributes');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { selectedValues, selectedProduct1, selectedCategory1, headingContent, showSlider, sliderDuration, background_color, selectedMediaUrl, buttonText, buttonLink, selectedMediaButtonUrl } = attributes;


    useEffect(() => {
        console.log(categories, "categories");
        // Fetch categories from your WordPress backend
        apiFetch({ path: '/wc/store/products/categories' }).then((response) => {
            setCategories(response);
            console.log(setCategories, 'setCategories');
        });
        selectedCategory1 &&
            apiFetch({ path: '/wc/store/products?category=' + selectedCategory1 }).then((response) => {
                setProducts(response);
            });

    }, []); // Fetch categories only once when the component mounts
    const productsArray = [];

    const fetchData = async () => {

        try {
            if (selectedValues.length > 0) {

                const responses = await Promise.all(
                    selectedValues.map((productId) =>
                        apiFetch({ path: '/wc/store/products/' + productId })
                    )
                );
                const productsArray = responses.map((response) => ({
                    id: response.id,
                    name: response.name,
                    permalink: response.permalink,
                    price: response.price_html,
                    sku: response.sku,
                    image: (response.images.length > 0) ? response.images[0].thumbnail : 'https://placehold.co/400x300/png',
                    description: response.description,
                    cartButton: response.add_to_cart.text,
                    cartUrl: response.add_to_cart.url,

                    // Add other product properties as needed
                }));
                setAttributes({ selectedProduct1: productsArray });
            }


            // setSelectedProduct(productsArray);

        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log('Selected values:', selectedValues);
    }, []);

    const onChangeHeading = (value) => {
        setAttributes({ headingContent: value });
    };

    const toggleSlider = () => {
        setAttributes({ showSlider: !showSlider });
    };

    const handleNumberChange = (value) => {
        setAttributes({ sliderDuration: value });
    };

    const onMediaSelect = (media) => {
        // Assuming you want to set the selected media URL to a block attribute
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
        apiFetch({ path: '/wc/store/products?category=' + value }).then((response) => {
            setProducts(response);
        });


        // setProducts(filteredProducts);
    };

    const handleProductChange = (value) => {

        // setSelectedIds(value);
        setAttributes({ selectedValues: value });

    };
    const addProductSelected = () => {
        // Add selected values from the dropdown to another constant
        const anotherConstant = selectedValues;
        console.log('Selected values:', anotherConstant);
        fetchData();

    };

    return (
        <>

            <InspectorControls>

                <PanelBody title={__('Settings', 'craft-blocks')} initialOpen={true}>
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
                                label={__('Slider Duration (ms):', 'craft-blocks')}
                                type="number"
                                value={sliderDuration}
                                onChange={(value) => { handleNumberChange(value) }}
                                min={1000}
                                max={4000}
                                step={100}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='ImageLeftPanel'>
                        <fieldset>
                            <div style={{ position: 'relative', marginBottom: '0px' }}>
                                {selectedMediaUrl && (
                                    <div>
                                        <img src={selectedMediaUrl} alt="Selected Heading Image" style={{ width: '100%', height: 'auto', border: '1px solid #dcdcdc', padding: '15px' }} />
                                        <Button className='' onClick={removeHeadingImage} style={{ position: 'absolute', top: '-5px', right: '-10px' }} >
                                            <Dashicon icon="dismiss" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <MediaUpload
                                onSelect={(value) => { onMediaSelect(value) }}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button className='imageUPloadbtn' onClick={open}>
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
                    <PanelRow>
                        <fieldset>
                            {/* Icon Button to open media gallery */}
                            <div style={{ position: 'relative', marginBottom: '16px' }}>
                                {selectedMediaButtonUrl && (
                                    <div>
                                        <img src={selectedMediaButtonUrl} alt="Selected Image" style={{ width: '100%', height: 'auto', border: '1px solid #dcdcdc', padding: '15px' }} />
                                        <Button onClick={removeButtonImage} style={{ position: 'absolute', top: '-5px', right: '-10px' }}                                   >
                                            <Dashicon icon="dismiss" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <MediaUpload
                                onSelect={(value) => { onMediaButtonSelect(value) }}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button
                                        label={__('Open Media Gallery', 'craft-blocks')}
                                        onClick={open}
                                    >
                                        Button  Icon
                                    </Button>
                                )}
                            />
                        </fieldset>
                    </PanelRow>
                    <PanelRow className='categoryDropdownPanel'>
                        <SelectControl
                            label="Select Category"
                            value={selectedCategory1}
                            options={categories.map(category => ({ label: category.name, value: category.id }))}
                            onChange={(value) => { handleCategoryChange(value) }}
                        />
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            multiple
                            label="Select Product"
                            value={selectedValues}
                            options={products.map((product) => ({
                                label: product.name,
                                value: product.id.toString(),
                            }))}
                            onChange={(value) => { handleProductChange(value) }}

                        />

                    </PanelRow>{/*
                    <PanelRow>
                         <Select2Dropdown  options={products} onChange={handleProductChange} /> 
                    </PanelRow>*/}
                    <PanelRow className='addItemsButtonPanel'>
                        <Button className='addItemsButton' onClick={addProductSelected} style={{}}>
                            Add Item
                        </Button>
                    </PanelRow>
                </PanelBody>

                <PanelBody title={__('Background Color', 'craft-blocks')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('', 'craft-blocks')}
                        colorSettings={[
                            {
                                value: background_color,
                                onChange: (value) => setAttributes({ background_color: value }),
                                label: __('Background Color', 'craft-blocks'),
                                colors: [{ color: '#fff' }, { color: 'F2F7FF' }, { color: '#26335B' }, { color: '#8E9FBC' }, { color: '#8C1C13' }, { color: '#3574DF' }]
                            },

                        ]}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <section className="spare-part-section box-color">
                    <div className="container spare-part-container1" style={{ backgroundColor: background_color }}>
                        <div className="spare-part-product-name">
                            <div className="spare-part-product-name-wrap">
                                <div className="sp-product-name product-title">
                                    <h2>{headingContent}</h2>
                                </div>
                            </div>
                            <div className="all-spare-parts-btn all-spare-btn">

                                {buttonText && (

                                    <a href={buttonLink}>
                                        {buttonText}
                                        {selectedMediaButtonUrl && (
                                            <img
                                                src={selectedMediaButtonUrl}
                                                alt="Selected Media"

                                            />
                                        )}

                                    </a>

                                )}
                            </div>
                        </div>
                        <div className="sp-wrap-slideshow">
                            <div className="spare-part-product-img">
                                {selectedMediaUrl && (

                                    <img
                                        src={selectedMediaUrl}
                                        alt="Selected Media"
                                        style={{ maxWidth: '100%' }}
                                    />

                                )}
                            </div>
                            {selectedProduct1 && (
                                <div className="all-spare-parts-slideshow" data-showSlider={showSlider} data-sliderDuration={sliderDuration} >

                                    {selectedProduct1.map((product, index) => (
                                        <div className="spare-parts">
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
                        </div>

                    </div>
                </section>
            </div>

        </>
    );
}
