import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	URLInput,
	MediaUpload,
	ColorPalette,
} from '@wordpress/block-editor';

import {
	TextControl,
	ToggleControl,
	PanelRow,
	Button,
	Dashicon,
	Dropdown,
} from '@wordpress/components';
import { createElement, useEffect, useState } from '@wordpress/element';
import {
	Icon,
	alignLeft,
	alignCenter,
	alignRight,
} from '@wordpress/icons';

import './editor.scss';

const STYLE_COLORS = [
	{ name: __( 'White', 'craft-blocks' ), color: '#ffffff' },
	{ name: __( 'Navy', 'craft-blocks' ), color: '#26335B' },
	{ name: __( 'Blue Gray', 'craft-blocks' ), color: '#8E9FBC' },
	{ name: __( 'Red', 'craft-blocks' ), color: '#8C1C13' },
	{ name: __( 'Blue', 'craft-blocks' ), color: '#3574DF' },
];

const GeneralTabIcon = () => (
	<svg
		viewBox="0 0 16 15"
		width="16"
		height="15"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<path
			fillRule="nonzero"
			d="M14.346 0H1.654C1.017 0 .5.517.5 1.154v12.692C.5 14.483 1.017 15 1.654 15h12.692c.637 0 1.154-.517 1.154-1.154V1.154C15.5.517 14.983 0 14.346 0zm-5.77 13.846v-5.77h5.77v5.77h-5.77z"
		/>
	</svg>
);

const StyleTabIcon = () => (

	<svg
		viewBox="0 0 18 21"
		width="18"
		height="21"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<path
			fillRule="nonzero"
			d="M15.12 12.091a.814.814 0 00-.68-.378.814.814 0 00-.68.378c-.531.863-2.252 3.807-2.252 5.09 0 1.598 1.317 2.901 2.932 2.901s2.933-1.303 2.933-2.902c0-1.303-1.722-4.226-2.253-5.089zm-1.041 3.828c-.043.063-.744 1.198-.213 1.976a.52.52 0 01.064.358.409.409 0 01-.191.294.608.608 0 01-.255.084.476.476 0 01-.383-.21c-.871-1.283.149-2.902.192-2.986a.517.517 0 01.297-.21.534.534 0 01.361.063c.192.126.255.42.128.63zM13.314 10.388l1.36-.147c.446-.042.807-.337.935-.736.127-.4.042-.862-.276-1.157L7.258.294c-.255-.252-.68-.252-.957 0a.68.68 0 000 .947l.34.336-5.1 5.047C.82 7.339.5 8.348.67 9.379c.128.652.489 1.24.956 1.703l3.082 3.05c.467.462 1.062.82 1.72.946a3.134 3.134 0 002.785-.863l3.612-3.575a.74.74 0 01.489-.252zM7.576 2.502l5.759 5.7H2.073c.085-.232.212-.463.403-.653l5.1-5.047z"
		/>
	</svg>
);

const AdvancedTabIcon = () => (
	<svg xmlns="https://www.w3.org/2000/svg" width="17" height="16"><path fill-rule="nonzero" d="M15.666 6.325c-.277-.05-.572-.082-.85-.115a6.385 6.385 0 00-.571-1.389c.18-.229.343-.457.523-.686a.994.994 0 00-.098-1.291l-.997-.997a.994.994 0 00-1.291-.098c-.23.163-.458.343-.687.523a6.954 6.954 0 00-1.39-.589c-.032-.277-.08-.572-.113-.85A.987.987 0 009.21 0H7.805a1 1 0 00-.98.834c-.05.277-.082.572-.115.85-.474.13-.947.326-1.389.571-.229-.18-.457-.343-.686-.523a.994.994 0 00-1.291.098l-.997.997a.994.994 0 00-.098 1.291c.163.23.343.458.523.687a6.954 6.954 0 00-.589 1.39c-.277.032-.572.08-.85.113A.987.987 0 00.5 7.29v1.406a1 1 0 00.834.98c.277.05.572.082.85.115.13.474.326.947.571 1.389-.18.229-.343.457-.523.686a.994.994 0 00.098 1.291l.997.997a.994.994 0 001.291.098c.23-.163.458-.343.687-.523.441.245.899.442 1.39.589.032.294.08.572.113.85.066.473.49.833.981.833h1.406a1 1 0 00.98-.834c.05-.277.082-.572.115-.85.474-.13.947-.326 1.389-.571.229.18.457.343.686.523a.994.994 0 001.291-.098l.997-.997a.994.994 0 00.098-1.291 19.095 19.095 0 00-.523-.687c.245-.441.442-.899.589-1.39.277-.032.572-.08.85-.113a.987.987 0 00.833-.981V7.305a1 1 0 00-.834-.98zM8.492 11.57a3.571 3.571 0 01-3.563-3.563 3.571 3.571 0 013.563-3.563 3.571 3.571 0 013.563 3.563 3.571 3.571 0 01-3.563 3.563z"></path></svg>
)

function MediaPickerControl( { label, value, onSelect, onRemove, imageAlt } ) {
	return (
		<div className="icon-box-media-control">
			<span className="icon-box-media-control__label">{ label }</span>
			<div className="icon-box-media-control__field">
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ [ 'image' ] }
					render={ ( { open } ) => (
						<Button
							className="icon-box-media-control__preview"
							label={ __( 'Open Media Gallery', 'craft-blocks' ) }
							onClick={ open }
						>
							{ value ? (
								<img src={ value } alt={ imageAlt } />
							) : (
								<span className="icon-box-media-control__placeholder">
									{ __( 'Select image', 'craft-blocks' ) }
								</span>
							) }
						</Button>
					) }
				/>
				{ value && (
					<Button
						className="icon-box-media-control__remove"
						label={ __( 'Remove image', 'craft-blocks' ) }
						onClick={ onRemove }
					>
						<Dashicon icon="dismiss" />
					</Button>
				) }
			</div>
		</div>
	);
}

function StyleColorControl( { label, value, defaultValue, onChange } ) {
	const currentValue = value || defaultValue || '#ffffff';

	return (
		<div className="icon-box-style-color-control">
			<span className="icon-box-style-color-control__label">{ label }</span>
			<div className="icon-box-style-color-control__actions">
				<Button
					className="icon-box-style-color-control__reset"
					label={ __( 'Reset color', 'craft-blocks' ) }
					onClick={ () => onChange( defaultValue ) }
				>
					<Dashicon icon="image-rotate" />
				</Button>
				<Dropdown
					className="icon-box-style-color-control__dropdown"
					contentClassName="icon-box-style-color-control__popover"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							className="icon-box-style-color-control__swatch"
							label={ label }
							aria-expanded={ isOpen }
							onClick={ onToggle }
							style={ { backgroundColor: currentValue } }
						/>
					) }
					renderContent={ () => (
						<ColorPalette
							colors={ STYLE_COLORS }
							value={ currentValue }
							onChange={ ( color ) => onChange( color || defaultValue ) }
						/>
					) }
				/>
			</div>
		</div>
	);
}

function InspectorTabButton( { icon, label, tabName, activeTab, onClick } ) {
	const renderIcon = () => {
		if ( icon === 'icon-box-general' ) {
			return (
				<span className="icon-box-tab-icon icon-box-tab-icon--general">
					<GeneralTabIcon />
				</span>
			);
		}

		if ( icon === 'icon-box-style') {
			return (
				<span className="icon-box-tab-icon icon-box-tab-icon--style">
					<StyleTabIcon />
				</span>
			);
		}

		if (  icon === 'icon-box-advanced' ) {
			return (
				<span className="icon-box-tab-icon icon-box-tab-icon--advanced">
					<AdvancedTabIcon />
				</span>
			);
		}

		return <Dashicon icon={ icon } />;
	};

	return (
		<Button
			className={ `icon-box-inspector-tabs__button ${
				activeTab === tabName ? 'is-active' : ''
			}` }
			onClick={ () => onClick( tabName ) }
		>
			{ renderIcon() }
			<span className="icon-box-inspector-tabs__label">{ label }</span>
		</Button>
	);
}

function ControlLabel( { children } ) {
	return <span className="icon-box-control-label">{ children }</span>;
}

function AlignmentControl( { value, onChange } ) {
	const activeAlign = value && value !== 'none' ? value : 'left';
	const options = [
		{
			value: 'left',
			icon: alignLeft,
			label: __( 'Align left', 'craft-blocks' ),
		},
		{
			value: 'center',
			icon: alignCenter,
			label: __( 'Align center', 'craft-blocks' ),
		},
		{
			value: 'right',
			icon: alignRight,
			label: __( 'Align right', 'craft-blocks' ),
		},
	];

	return (
		<div className="icon-box-control icon-box-control--alignment">
			<ControlLabel>{ __( 'Text Alignment', 'craft-blocks' ) }</ControlLabel>
			<div className="icon-box-choice-group icon-box-choice-group--alignment">
				{ options.map( ( option ) => (
					<Button
						key={ option.value }
						className={ `icon-box-choice-button ${
							activeAlign === option.value ? 'is-active' : ''
						}` }
						label={ option.label }
						onClick={ () => onChange( option.value ) }
					>
						<Icon icon={ option.icon } size={ 20 } />
					</Button>
				) ) }
			</div>
		</div>
	);
}

function HeadingTagControl( { value, onChange } ) {
	const activeTag = value || 'h2';
	const options = [
		{ value: 'h1', label: 'H1' },
		{ value: 'h2', label: 'H2' },
		{ value: 'h3', label: 'H3' },
		{ value: 'h4', label: 'H4' },
		{ value: 'h5', label: 'H5' },
		{ value: 'h6', label: 'H6' },
		{ value: 'p', label: 'P' },
		{ value: 'div', label: 'Div' },
	];

	return (
		<div className="icon-box-control">
			<ControlLabel>{ __( 'Heading Tag', 'craft-blocks' ) }</ControlLabel>
			<div className="icon-box-choice-group icon-box-choice-group--heading-tag">
				{ options.map( ( option ) => (
					<Button
						key={ option.value }
						className={ `icon-box-choice-button ${
							activeTag === option.value ? 'is-active' : ''
						}` }
						onClick={ () => onChange( option.value ) }
					>
						{ option.label }
					</Button>
				) ) }
			</div>
		</div>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const [ activeInspectorTab, setActiveInspectorTab ] = useState( 'general' );
	const blockProps = useBlockProps( {
		className: 'wz-alert',
	} );
	const {
		descriptionContent,
		align,
		showHeading,
		headingContent,
		headingTag,
		buttonText,
		buttonLink,
		selectedMediaUrl,
		selectedMediaButtonUrl,
		sectionBackgroundColor,
		buttonColor,
		buttonBackgroundColor,
		iconColor,
	} = attributes;

	const onChangeAlign = ( newAlign ) => {
		setAttributes( {
			align: newAlign === undefined ? 'left' : newAlign,
		} );
	};

	const onMediaSelect = ( media ) => {
		if ( media && media.url ) {
			setAttributes( { selectedMediaUrl: media.url } );
		}
	};

	const onMediaButtonSelect = ( mediaButton ) => {
		if ( mediaButton && mediaButton.url ) {
			setAttributes( { selectedMediaButtonUrl: mediaButton.url } );
		}
	};

	const selectedHeadingTag = headingTag || 'h2';
	const selectedAlign = align && align !== 'none' ? align : 'left';
	const dynamicClasses = `icon-box-block-container ${
		selectedAlign ? `text-${ selectedAlign }` : ''
	}`;

	useEffect( () => {
		if ( activeInspectorTab !== 'advanced' ) {
			return undefined;
		}

		const animationFrame = window.requestAnimationFrame( () => {
			const advancedToggle = document.querySelector(
				'.block-editor-block-inspector__advanced .components-panel__body-toggle'
			);

			if (
				advancedToggle &&
				advancedToggle.getAttribute( 'aria-expanded' ) === 'false'
			) {
				advancedToggle.click();
			}
		} );

		return () => window.cancelAnimationFrame( animationFrame );
	}, [ activeInspectorTab ] );

	return (
		<>
			<InspectorControls>
				<div
					className={ `icon-box-inspector-tabs ${
						activeInspectorTab === 'advanced' ? 'is-advanced-active' : ''
					}` }
				>
					<div className="icon-box-inspector-tabs__nav">
						<InspectorTabButton
							icon="icon-box-general"
							label={ __( 'General', 'craft-blocks' ) }
							tabName="general"
							activeTab={ activeInspectorTab }
							onClick={ setActiveInspectorTab }
						/>
						<InspectorTabButton
							icon="icon-box-style"
							label={ __( 'Style', 'craft-blocks' ) }
							tabName="style"
							activeTab={ activeInspectorTab }
							onClick={ setActiveInspectorTab }
						/>
						<InspectorTabButton
							icon="icon-box-advanced"
							label={ __( 'Advanced', 'craft-blocks' ) }
							tabName="advanced"
							activeTab={ activeInspectorTab }
							onClick={ setActiveInspectorTab }
						/>
					</div>
					<div className="icon-box-inspector-tabs__content icon-box-settings-panel">
						{ activeInspectorTab === 'general' && (
							<>
								<PanelRow>
									<fieldset>
										<TextControl
											label={ __( 'Heading', 'craft-blocks' ) }
											value={ headingContent }
											onChange={ ( value ) =>
												setAttributes( { headingContent: value } )
											}
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<AlignmentControl
											value={ align }
											onChange={ onChangeAlign }
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<ToggleControl
											label={ __( 'Heading', 'craft-blocks' ) }
											checked={ showHeading }
											onChange={ () =>
												setAttributes( { showHeading: ! showHeading } )
											}
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<HeadingTagControl
											value={ headingTag }
											onChange={ ( value ) =>
												setAttributes( { headingTag: value } )
											}
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<MediaPickerControl
											label={ __( 'Icon', 'craft-blocks' ) }
											value={ selectedMediaUrl }
											onSelect={ onMediaSelect }
											onRemove={ () =>
												setAttributes( { selectedMediaUrl: null } )
											}
											imageAlt={ __( 'Selected icon', 'craft-blocks' ) }
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<TextControl
											label={ __( 'Button Text', 'craft-blocks' ) }
											value={ buttonText }
											onChange={ ( value ) =>
												setAttributes( { buttonText: value || '' } )
											}
											placeholder={ __(
												'Enter button text',
												'craft-blocks'
											) }
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<URLInput
											label={ __( 'Button Link', 'craft-blocks' ) }
											value={ buttonLink }
											onChange={ ( url ) =>
												setAttributes( { buttonLink: url || '' } )
											}
										/>
									</fieldset>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<MediaPickerControl
											label={ __( 'Button Icon', 'craft-blocks' ) }
											value={ selectedMediaButtonUrl }
											onSelect={ onMediaButtonSelect }
											onRemove={ () =>
												setAttributes( { selectedMediaButtonUrl: null } )
											}
											imageAlt={ __(
												'Selected button icon',
												'craft-blocks'
											) }
										/>
									</fieldset>
								</PanelRow>
							</>
						) }
						{ activeInspectorTab === 'style' && (
							<div className="icon-box-style-settings">
								<StyleColorControl
									label={ __( 'Background Color', 'craft-blocks' ) }
									value={ sectionBackgroundColor }
									defaultValue="#ffffff"
									onChange={ ( value ) =>
										setAttributes( { sectionBackgroundColor: value } )
									}
								/>
								<span className="icon-box-style-settings__group-label">
									{ __( 'Button', 'craft-blocks' ) }
								</span>
								<StyleColorControl
									label={ __( 'Text Color', 'craft-blocks' ) }
									value={ buttonColor }
									defaultValue="#ffffff"
									onChange={ ( value ) =>
										setAttributes( { buttonColor: value } )
									}
								/>
								<StyleColorControl
									label={ __( 'Background Color', 'craft-blocks' ) }
									value={ buttonBackgroundColor }
									defaultValue="#26335B"
									onChange={ ( value ) =>
										setAttributes( { buttonBackgroundColor: value } )
									}
								/>
								<StyleColorControl
									label={ __( 'Icon Color', 'craft-blocks' ) }
									value={ iconColor }
									defaultValue="#ffffff"
									onChange={ ( value ) =>
										setAttributes( { iconColor: value } )
									}
								/>
							</div>
						) }
					</div>
				</div>
			</InspectorControls>
			<div { ...blockProps }>
				<section className="icon-box-block-section">
					<div className="container">
						<div
							className={ dynamicClasses }
							style={ { backgroundColor: sectionBackgroundColor } }
						>
							{ showHeading && (
								<div className="icon-with-text">
									{ selectedMediaUrl && (
										<div className="icon-img">
											<img
												src={ selectedMediaUrl }
												alt="Selected Media"
												style={ { maxWidth: '100%' } }
											/>
										</div>
									) }
									<div className="icon-title">
										{ createElement( selectedHeadingTag, null, headingContent ) }
									</div>
								</div>
							) }
							<div className="icon-box-content">
								<RichText
									tagName="p"
									value={ descriptionContent }
									onChange={ ( value ) =>
										setAttributes( { descriptionContent: value } )
									}
									placeholder={ __(
										'Enter the alert text...',
										'craft-blocks'
									) }
								/>
							</div>
							{ buttonText && (
								<div className="icon-box-learn-more button-1">
									<div className="learn-more">
										<a
											href={ buttonLink || '#' }
											target={ buttonLink ? '_blank' : '' }
											style={ {
												backgroundColor: buttonBackgroundColor,
												color: buttonColor,
											} }
										>
											{ selectedMediaButtonUrl && (
												<img
													src={ selectedMediaButtonUrl }
													alt="Selected Media"
													style={ {
														maxWidth: '100%',
														backgroundColor: iconColor,
													} }
												/>
											) }
											{ buttonText }
										</a>
									</div>
								</div>
							) }
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
