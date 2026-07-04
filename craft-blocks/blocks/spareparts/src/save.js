import { RawHTML, createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes, setAttributes }) {

    const blockProps = useBlockProps.save({
        className: 'qhb-spareparts-slideshow',
    });
    const { selectedProduct1, quantity, headingContent, showSlider, sliderDuration, selectedMediaUrl, buttonText, buttonLink, selectedMediaButtonUrl, background_color } = attributes;
    const hasTitle = Boolean(headingContent && headingContent.trim());
    const hasImage = Boolean(selectedMediaUrl && selectedMediaUrl.trim());
    const hasButton = Boolean(buttonText && buttonText.trim());

    const handleQuantityChange = (event, id) => {
        const newQuantity = { [id]: event.target.value };
        setAttributes({ quantity: { ...quantity, ...newQuantity } });
    };
    return (
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
                                                style={{ maxWidth: '20%' }}
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
                            <div className={`all-spare-parts-slideshow ${showSlider ? 'is-slider-enabled' : 'is-slider-disabled'}`} data-showSlider={showSlider} data-sliderDuration={sliderDuration}>

                                {selectedProduct1.filter(Boolean).map((product, index) => (
                                    <div className="spare-parts">
                                        <div className="spare-parts-wrap">
                                                <div className="spare-part-img">
                                                    <div className="spare-part-product-popup">
                                                    <RawHTML>{`[woosq id=${product.id}]`}</RawHTML>
                                                    <a href={product.permalink}>
                                                        <img src={product.image} />
                                                    </a>
                                                </div>
                                            </div>
                                            {
                                                product.sku && (
                                                    <div className="sp-sku txt-center">
                                                        <a href={product.permalink}><span>
                                                            {product.sku}
                                                        </span></a>
                                                    </div>
                                                )
                                            }
                                            {
                                                product.name && (
                                                    <div className="spare-part-name txt-center">
                                                        <a href={product.permalink}><span>
                                                            {product.name}
                                                        </span></a>
                                                    </div>
                                                )}

                                            {
                                                product.price && (
                                                    <div className="spare-part-price txt-center">
                                                        <div dangerouslySetInnerHTML={{ __html: product.price }} />
                                                    </div>
                                                )
                                            }

                                            {
                                                product.cartButton && (
                                                    <div className="spare-part-buy-container">
                                                         <div className="sp-add-to-cart-btn-wrap" >
                                                            <a href="javascript:;" data-quantity="1" data-product_id={product.id} data-product_sku={product.sku || ''} className="sp-addToCart-btn ajax_add_to_cart" aria-label={`Add ${product.name} to cart`} rel="nofollow">
                                                                <button type="button" className="sp-add-to-cart-btn button alt">
                                                                    {product.cartButton}
                                                                </button>
                                                            </a>
                                                         </div>
                                                    </div>
                                                )
                                            }

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
    );
}
