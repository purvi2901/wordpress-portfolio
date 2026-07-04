import { createElement } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  console.log('save',attributes);
  const blockProps = useBlockProps.save({
    className: 'wz-alert',
  });

  const { subheading, activeTab,  showSubHeading, headingContent, headingTag,  sectionBackgroundColor, subHeadingColor,  headingColor } = attributes;
  const className = blockProps.className;

  const selectedHeadingTag = headingTag || 'div';


  return (
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
  );
}
