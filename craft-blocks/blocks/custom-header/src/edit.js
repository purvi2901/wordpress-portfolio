/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	URLInput,
	IconButton,
	MediaUpload,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	TextareaControl,
	ToggleControl,
	ColorPicker,
	Button,
	Dashicon,
	Toolbar,
	ToolbarButton
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';


import './editor.scss';

const GeneralTabIcon = () => (
	<svg viewBox="0 0 16 15" width="16" height="15" aria-hidden="true" focusable="false">
		<path
			fillRule="nonzero"
			d="M14.346 0H1.654C1.017 0 .5.517.5 1.154v12.692C.5 14.483 1.017 15 1.654 15h12.692c.637 0 1.154-.517 1.154-1.154V1.154C15.5.517 14.983 0 14.346 0zm-5.77 13.846v-5.77h5.77v5.77h-5.77z"
		/>
	</svg>
);

const StyleTabIcon = () => (
	<svg viewBox="0 0 18 21" width="18" height="21" aria-hidden="true" focusable="false">
		<path
			fillRule="nonzero"
			d="M15.12 12.091a.814.814 0 00-.68-.378.814.814 0 00-.68.378c-.531.863-2.252 3.807-2.252 5.09 0 1.598 1.317 2.901 2.932 2.901s2.933-1.303 2.933-2.902c0-1.303-1.722-4.226-2.253-5.089zm-1.041 3.828c-.043.063-.744 1.198-.213 1.976a.52.52 0 01.064.358.409.409 0 01-.191.294.608.608 0 01-.255.084.476.476 0 01-.383-.21c-.871-1.283.149-2.902.192-2.986a.517.517 0 01.297-.21.534.534 0 01.361.063c.192.126.255.42.128.63zM13.314 10.388l1.36-.147c.446-.042.807-.337.935-.736.127-.4.042-.862-.276-1.157L7.258.294c-.255-.252-.68-.252-.957 0a.68.68 0 000 .947l.34.336-5.1 5.047C.82 7.339.5 8.348.67 9.379c.128.652.489 1.24.956 1.703l3.082 3.05c.467.462 1.062.82 1.72.946a3.134 3.134 0 002.785-.863l3.612-3.575a.74.74 0 01.489-.252zM7.576 2.502l5.759 5.7H2.073c.085-.232.212-.463.403-.653l5.1-5.047z"
		/>
	</svg>
);

const AdvancedTabIcon = () => (
	<svg viewBox="0 0 17 16" width="17" height="16" aria-hidden="true" focusable="false">
		<path
			fillRule="nonzero"
			d="M15.666 6.325c-.277-.05-.572-.082-.85-.115a6.385 6.385 0 00-.571-1.389c.18-.229.343-.457.523-.686a.994.994 0 00-.098-1.291l-.997-.997a.994.994 0 00-1.291-.098c-.23.163-.458.343-.687.523a6.954 6.954 0 00-1.39-.589c-.032-.277-.08-.572-.113-.85A.987.987 0 009.21 0H7.805a1 1 0 00-.98.834c-.05.277-.082.572-.115.85-.474.13-.947.326-1.389.571-.229-.18-.457-.343-.686-.523a.994.994 0 00-1.291.098l-.997.997a.994.994 0 00-.098 1.291c.163.23.343.458.523.687a6.954 6.954 0 00-.589 1.39c-.277.032-.572.08-.85.113A.987.987 0 00.5 7.29v1.406a1 1 0 00.834.98c.277.05.572.082.85.115.13.474.326.947.571 1.389-.18.229-.343.457-.523.686a.994.994 0 00.098 1.291l.997.997a.994.994 0 001.291.098c.23-.163.458-.343.687-.523.441.245.899.442 1.39.589.032.294.08.572.113.85.066.473.49.833.981.833h1.406a1 1 0 00.98-.834c.05-.277.082-.572.115-.85.474-.13.947-.326 1.389-.571.229.18.457.343.686.523a.994.994 0 001.291-.098l.997-.997a.994.994 0 00.098-1.291 19.095 19.095 0 00-.523-.687c.245-.441.442-.899.589-1.39.277-.032.572-.08.85-.113a.987.987 0 00.833-.981V7.305a1 1 0 00-.834-.98zM8.492 11.57a3.571 3.571 0 01-3.563-3.563 3.571 3.571 0 013.563-3.563 3.571 3.571 0 013.563 3.563 3.571 3.571 0 01-3.563 3.563z"
		/>
	</svg>
);

function HeadingTagControl({ value, onChange }) {
	const activeTag = value || 'h2';
	const options = [
		{ value: 'h1', label: 'H1' },
		{ value: 'h2', label: 'H2' },
		{ value: 'h3', label: 'H3' },
		{ value: 'h4', label: 'H4' },
		{ value: 'h5', label: 'H5' },
		{ value: 'h6', label: 'H6' },
		{ value: 'p', label: 'P' },
		{ value: 'div', label: 'DIV' },
	];

	return (
		<div className="custom-header-heading-tag">
			<span className="custom-header-heading-tag__label">
				{__('Heading Tag', 'craft-blocks')}
			</span>
			<div className="custom-header-heading-tag__options">
				{options.map((option) => (
					<Button
						key={option.value}
						className={`custom-header-heading-tag__button ${
							activeTag === option.value ? 'is-active' : ''
						}`}
						onClick={() => onChange(option.value)}
					>
						{option.label}
					</Button>
				))}
			</div>
		</div>
	);
}



export default function Edit({ attributes, setAttributes }) {

	const blockProps = useBlockProps({
		className: 'wz-alert',
	});
	const { subheading, align, showSubHeading, headingContent, headingTag, sectionBackgroundColor, subHeadingColor, headingColor } = attributes;
	const [ selectedInspectorTab, setSelectedInspectorTab ] = useState( 'general' );

	const onChangeHeading = (newHeading) => {
		setAttributes({ headingContent: newHeading });
	};

	const toggleHeading = () => {
		setAttributes({ showSubHeading: !showSubHeading });
	};

	const onChangeHeadingTag = (newHeadingTag) => {
		setAttributes({ headingTag: newHeadingTag });
	};

	const onChangeSubheading = (value) => {
		setAttributes({ subheading: value });
	};

	const switchTab = (value) => {
		setSelectedInspectorTab(value);
	};

	useEffect(() => {
		if (selectedInspectorTab !== 'advanced') {
			return undefined;
		}

		const animationFrame = window.requestAnimationFrame(() => {
			const advancedToggle = document.querySelector(
				'.block-editor-block-inspector__advanced .components-panel__body-toggle'
			);

			if (
				advancedToggle &&
				advancedToggle.getAttribute('aria-expanded') === 'false'
			) {
				advancedToggle.click();
			}
		});

		return () => window.cancelAnimationFrame(animationFrame);
	}, [selectedInspectorTab]);

	const selectedHeadingTag = headingTag || 'h2';

	return (
		<>
			<InspectorControls>
				<div className={`tab-content-wrap custom-header-inspector-tabs ${selectedInspectorTab === 'advanced' ? 'is-advanced-active' : ''}`}>
							<div className="tabs">
								<button onClick={() => switchTab('general')} className={selectedInspectorTab === 'general' ? 'active' : ''}>
									<span className="tab-icon tab-icon--general"><GeneralTabIcon /></span>
									<span>{__('General', 'craft-blocks')}</span>
								</button>
								<button onClick={() => switchTab('styles')} className={`tab-button--style ${selectedInspectorTab === 'styles' ? 'active' : ''}`}>
									<span className="tab-icon tab-icon--style"><StyleTabIcon /></span>
									<span>{__('Style', 'craft-blocks')}</span>
								</button>
								<button onClick={() => switchTab('advanced')} className={selectedInspectorTab === 'advanced' ? 'active' : ''}>
									<span className="tab-icon tab-icon--advanced"><AdvancedTabIcon /></span>
									<span>{__('Advanced', 'craft-blocks')}</span>
								</button>

							</div>
							<div className="tab-content">
								{selectedInspectorTab === 'general' && (
									<div className="content-section">
										<TextControl
											label={__(
												'Heading',
												'craft-blocks'
											)}
											value={headingContent}
											onChange={(value) => { onChangeHeading(value) }}
										/>
										<HeadingTagControl
											value={headingTag}
											onChange={onChangeHeadingTag}
										/>
										<div className='subheading-wrap'>
											<div className='subheading-toggle'>
												<ToggleControl
													label={__(
														'SubHeading',
														'craft-blocks'
													)}
													checked={showSubHeading}
													onChange={toggleHeading}
												/>
											</div>
											{
												showSubHeading && (
													<div className='subheding-text'>
														<TextareaControl
															label=""
															value={subheading}
															onChange={onChangeSubheading}
														/>
													</div>
												)
											}



										</div>
									</div>
								)}

								{selectedInspectorTab === 'styles' && (
									<div className="style-section">
										<PanelColorSettings
											title={__('Background Color ', 'craft-blocks')}
											colorSettings={[
												{
													value: sectionBackgroundColor,
													onChange: (value) => setAttributes({ sectionBackgroundColor: value }),
													label: __('', 'craft-blocks'),
													colors: [{ color: '#fff' }, { color: '#26335B' }, { color: '#8E9FBC' }, { color: '#8C1C13' }, { color: '#3574DF' }]
												}
											]}
										/>

										<PanelColorSettings
											title={__('Heading Color', 'craft-blocks')}
											colorSettings={[
												{
													value: headingColor,
													onChange: (value) => setAttributes({ headingColor: value }),
													label: __('', 'craft-blocks'),
													colors: [{ color: '#fff' }, { color: '#26335B' }, { color: '#8E9FBC' }, { color: '#8C1C13' }, { color: '#3574DF' }]
												}
											]}
										/>

										<PanelColorSettings
											title={__('SubHeading Color', 'craft-blocks')}
											colorSettings={[
												{
													value: subHeadingColor,
													onChange: (value) => setAttributes({ subHeadingColor: value }),
													label: __(' ', 'craft-blocks'),
													colors: [{ color: '#fff' }, { color: '#26335B' }, { color: '#8E9FBC' }, { color: '#8C1C13' }, { color: '#3574DF' }]
												}
											]}
										/>


									</div>
								)}
							</div>
				</div>
			</InspectorControls>
			<div {...blockProps}>
				<section className="header-block-section" style={{ backgroundColor: sectionBackgroundColor }}>
					<div className='header-wrap'>
						{
							headingContent && (
								<div className='header-title' style={{ backgroundColor: '#fff' }}>
									{createElement(selectedHeadingTag, { style: { color: headingColor} }, headingContent)}
								</div>
							)
						}
						{
							showSubHeading && (
								<div className='subheading-title' style={{ color: subHeadingColor }} >
									{subheading}
								</div>
							)
						}
					</div>
				</section>
			</div>
		</>
	);
}
