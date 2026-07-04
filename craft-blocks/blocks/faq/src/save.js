/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps,RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    console.log('save',attributes);
	const { faqs  } = attributes;
    const faq_title = attributes.faq_title;
    return (
        <div { ...useBlockProps.save({ className: 'rtcwp-faq-section' }) }>
            <div className="container">
                <div className="rtcwp-faq-top-title">
                    <RichText.Content tagName="h2" value={ faq_title } />
                </div>
                <div className="accordions rtcwp-faq-question-answer">    
                    {faqs.map((faq, index) => (
                        <div key={index} className="accordion-item">
                            <div className="title-tab faq-question" key={index}>
                                <span className="icon"></span><h3>{faq.question}</h3>
                            </div>
                            <div className="inner-content">
                                <div className="content faq-answer">{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
       </div>
    );
}