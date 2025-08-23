// FilePond initialization for book cover uploads
document.addEventListener('DOMContentLoaded', function() {
    // Check if FilePond is available
    if (typeof FilePond !== 'undefined') {
        // Register plugins
        FilePond.registerPlugin(
            FilePondPluginFileEncode,
            FilePondPluginImagePreview
        );

        // Initialize FilePond on all file inputs with class 'filepond'
        const fileInputs = document.querySelectorAll('input[type="file"].filepond');
        
        fileInputs.forEach(input => {
            const pond = FilePond.create(input, {
                // FilePond options
                allowMultiple: false,
                maxFiles: 1,
                acceptedFileTypes: ['image/*'],
                maxFileSize: '5MB',
                imagePreviewHeight: 200,
                imageCropAspectRatio: '3:4',
                imageResizeTargetWidth: 300,
                imageResizeTargetHeight: 400,
                styleItemPanelAspectRatio: 0.5,
                styleLoadIndicatorPosition: 'center bottom',
                styleProgressIndicatorPosition: 'right bottom',
                styleButtonRemoveItemPosition: 'left bottom',
                styleButtonProcessItemPosition: 'right bottom',
                
                // Shorter, more compact labels
                labelIdle: '📸 Drag & Drop cover here or <span class="filepond--label-action">Browse</span>',
                labelFileProcessing: 'Uploading...',
                labelFileProcessingComplete: '✓ Uploaded',
                labelFileProcessingAborted: '✗ Cancelled',
                labelFileProcessingError: '✗ Failed',
                labelTapToCancel: 'Click to cancel',
                labelTapToRetry: 'Click to retry',
                labelTapToUndo: 'Click to undo',
                
                // Disable server processing for now (we'll handle in form submission)
                server: null,
                
                // Store file data for form submission
                onaddfile: (error, file) => {
                    if (error) {
                        console.error('Error adding file:', error);
                        return;
                    }
                    // Store file data for form submission
                    input.fileData = file;
                },
                
                onremovefile: () => {
                    // Clear stored file data
                    input.fileData = null;
                }
            });

            // Store pond instance for form submission
            input.pond = pond;
        });
    } else {
        console.error('FilePond not loaded. Check if CDN scripts are accessible.');
    }
});