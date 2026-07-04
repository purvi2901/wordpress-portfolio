<?php
/**
 * Plugin Name:       CraftBlocks
 * Description:       Custom Gutenberg blocks plugin.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            WPWeb
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       craft-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function create_block_multiple_blocks_plugin_block_init() {
    register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/slideshow/' );
    register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/icon-box/' );
    //register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/slider/' );	
    register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/spareparts/' );  
    register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/product-card/' );
    register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/custom-header/' );
}
add_action( 'init', 'create_block_multiple_blocks_plugin_block_init' );


function enqueue_backend_scripts() {
	wp_enqueue_script('jquery');
    wp_enqueue_script('backend-script', plugin_dir_url(__FILE__) . 'js/editor.js', array('jquery'), time(), true);
    wp_enqueue_script('slick-script', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.js');
    wp_enqueue_style('font-style', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
}

add_action('admin_enqueue_scripts', 'enqueue_backend_scripts',90);

// Enqueue frontend script
function enqueue_frontend_scripts() {
    wp_enqueue_script('frontend-script', plugin_dir_url(__FILE__) . 'js/style.js?ver=1.1', array('jquery'), time(), true);
    wp_enqueue_script('slick-script', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.js');
    wp_enqueue_style('font-style', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css');
}
add_action('wp_enqueue_scripts', 'enqueue_frontend_scripts');