import { RawHTML,createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes, setAttributes  }) {

    const blockProps = useBlockProps.save({
        className: 'qhb-spareparts-slideshow',
    });
    const { selectedProduct1, quantity, headingContent, showSlider, sliderDuration, selectedMediaUrl, buttonText, buttonLink, selectedMediaButtonUrl, background_color } = attributes;
    const handleQuantityChange = (event, id) => {
        const newQuantity = { [id]: event.target.value };
        setAttributes({ quantity: { ...quantity, ...newQuantity } });
    };
    return (
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
                            <div className="all-spare-parts-slideshow" data-showSlider={showSlider} data-sliderDuration={sliderDuration}>

                                {selectedProduct1.map((product, index) => (
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
                                            <div className="spare-part-buy-container">
                                            <div className="sp-add-to-cart-btn-wrap">
                                                        <a href={product.cartUrl+ '&quantity=' + 1}><button type="submit" className="sp-add-to-cart-btn button alt" tabindex="-1">
                                                            <input
                                                                type="hidden"
                                                                value="1"
                                                            />
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
    );
}
