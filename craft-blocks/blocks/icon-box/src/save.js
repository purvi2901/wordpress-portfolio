import { createElement } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  console.log('save',attributes);
  const blockProps = useBlockProps.save({
    className: 'wz-alert',
  });


  const { descriptionContent, align, showHeading, headingContent, headingTag, iconName, buttonText, buttonLink, selectedMediaUrl, selectedMediaButtonUrl,buttonBackgroundColor,buttonColor,sectionBackgroundColor,iconColor } = attributes;  
  const className = blockProps.className;

  const selectedHeadingTag = headingTag || 'div';
  const dynamicClasses = `icon-box-block-container ${align ? `text-${align}` : ''}`;
  return (
    <div {...blockProps}>      
      <section className="icon-box-block-section">
        <div className="container">
            <div className={dynamicClasses} style={{backgroundColor:sectionBackgroundColor}}>
                {showHeading && (
                  <div className="icon-with-text">
                    {selectedMediaUrl && (
                      <div className="icon-img">
                        <img
                          src={selectedMediaUrl}
                          alt="Selected Media"
                          style={{ maxWidth: '100%'}}
                        />
                      </div>
                    )}
                    
                    <div className="icon-title">
                        {createElement(selectedHeadingTag, null, headingContent)}
                    </div>
                  </div>
                )}              
                
                {descriptionContent && (
                  <div className="icon-box-content">
                   <RichText.Content                      
                      tagName="p"
                      value={ descriptionContent }
                    />                    
                  </div>
                )}
                
                {buttonText && (
                  <div className="icon-box-learn-more button-1">
                    <div className="learn-more">
                      <a href={buttonLink || "#"} target={buttonLink ? "_blank" : ""} rel="noopener" style={{backgroundColor:buttonBackgroundColor, color:buttonColor}}>
                        {selectedMediaButtonUrl && (
                          <img
                            src={selectedMediaButtonUrl}
                            alt="Selected Button Icon"
                            style={{ maxWidth: '100%',backgroundColor:iconColor }}
                          />
                        )}
                        {buttonText}                        
                      </a>
                    </div>
                  </div>
                )}
            </div>
        </div>
      </section>      
    </div>
  );
}
