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
import { TextControl, Button } from '@wordpress/components';
import { RichText,useBlockProps } from '@wordpress/block-editor';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    console.log('Edit',attributes);
    const { faqs } = attributes;
    const faq_title = attributes.faq_title;
    
    const onChangeTitle = ( value ) => {
        setAttributes( { faq_title: value } );
    };

    const addFAQ = () => {
        const newFAQs = [...faqs, { question: 'Question', answer: 'Answer' }];
        setAttributes({ faqs: newFAQs });
    };

    const removeFAQ = (index) => {
        const newFAQs = [...faqs];
        newFAQs.splice(index, 1);
        setAttributes({ faqs: newFAQs });
    };

    const updateFAQ = (index, field, value) => {
        const newFAQs = [...faqs];
        newFAQs[index][field] = value;
        setAttributes({ faqs: newFAQs });
    };

    return (
        <div { ...useBlockProps({ className: 'rtcwp-faq-section' }) }>
            <div className="container">
                <div className="rtcwp-faq-top-title">
                    <RichText
                        tagName="h2"
                        placeholder={ __(
                            'Enter FAQ Title',
                            'wpweb-block-plugin'
                        ) }
                        value={ faq_title }
                        onChange={ onChangeTitle }
                    />
                </div>
                <div className="accordions rtcwp-faq-question-answer">    
                    {faqs.map((faq, index) => (
                         <div key={index} class="accordion-item">
                            <div className="title-tab faq-question" key={index}>
                                <span className="icon"></span>
                                <RichText
                                    tagName="h3"
                                    placeholder={`Enter the Question ${index + 1}`}
                                    value={faq.question}
                                    onChange={(value) => updateFAQ(index, 'question', value)}
                                />
                            </div>
                            <div className="inner-content">
                                <RichText
                                    tagName="div"
                                    className='content faq-answer'
                                    label={`Enter the Answer ${index + 1}`}
                                    value={faq.answer}
                                    onChange={(value) => updateFAQ(index, 'answer', value)}
                                />
                            </div>
                            <Button onClick={() => removeFAQ(index)}>Remove FAQ</Button>
                        </div>
                    ))}
                </div>
                <Button onClick={addFAQ}>Add FAQ</Button>
            </div>
        </div>
    );
}