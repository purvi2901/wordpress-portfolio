/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	AlignmentControl,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';




import {
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	SelectControl,
	URLInput,

	
} from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const updateSlide = (index, key, value) => {
        const newSlides = [...attributes.slides];
        newSlides[index][key] = value;
        setAttributes({ slides: newSlides });
    };

    const addSlide = () => {
        setAttributes({
            slides: [...attributes.slides, { image: '', description: '', button: '' }],
        });
    };

    const removeSlide = (index) => {
        const newSlides = [...attributes.slides];
        newSlides.splice(index, 1);
        setAttributes({ slides: newSlides });
    };

    return (
        <div>
            <InspectorControls>
                <PanelBody title="Slider Settings">
                    <Button onClick={addSlide}>Add Slide</Button>
                </PanelBody>
            </InspectorControls>

            {attributes.slides.map((slide, index) => (
                <div key={index}>
                    <img
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <TextControl
                        label="Image Description"
                        value={slide.description}
                        onChange={(value) => updateSlide(index, 'description', value)}
                    />
                    <TextareaControl
                        label="Button"
                        value={slide.button}
                        onChange={(value) => updateSlide(index, 'button', value)}
                    />
                    <Button onClick={() => removeSlide(index)}>Remove Slide</Button>
                </div>
            ))}
        </div>
    );
}
