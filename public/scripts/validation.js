// Client-side form validation using JavaScript RegEx

(function() {
    'use strict';

    // Get all forms that need validation
    const forms = document.querySelectorAll('form[id$="Form"]');

    // Validate each form
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Custom validation for skills checkboxes
            if (form.id === 'addStudentForm' || form.id === 'updateStudentForm') {
                const skillsCheckboxes = form.querySelectorAll('input[name="skills"]:checked');
                const skillsError = form.querySelector('#skillsError');
                
                if (skillsCheckboxes.length === 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (skillsError) {
                        skillsError.style.display = 'block';
                    }
                } else {
                    if (skillsError) {
                        skillsError.style.display = 'none';
                    }
                }
            }

            // Custom validation for phone number (Indian format)
            const phoneInput = form.querySelector('input[name="guardianPhone"]');
            if (phoneInput && phoneInput.value.trim() !== '') {
                const phonePattern = /^[6-9]\d{9}$/;
                if (!phonePattern.test(phoneInput.value.trim())) {
                    event.preventDefault();
                    event.stopPropagation();
                    phoneInput.setCustomValidity('Please enter a valid 10-digit Indian mobile number (starting with 6-9)');
                    phoneInput.classList.add('is-invalid');
                } else {
                    phoneInput.setCustomValidity('');
                    phoneInput.classList.remove('is-invalid');
                }
            }

            form.classList.add('was-validated');
        }, false);

        // Real-time validation for phone number
        const phoneInput = form.querySelector('input[name="guardianPhone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                if (this.value.trim() === '') {
                    this.setCustomValidity('');
                    this.classList.remove('is-invalid');
                } else {
                    const phonePattern = /^[6-9]\d{9}$/;
                    if (phonePattern.test(this.value.trim())) {
                        this.setCustomValidity('');
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    } else {
                        this.setCustomValidity('Please enter a valid 10-digit Indian mobile number (starting with 6-9)');
                        this.classList.remove('is-valid');
                        this.classList.add('is-invalid');
                    }
                }
            });

            // Only allow numeric input for phone
            phoneInput.addEventListener('keypress', function(e) {
                if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
                    e.preventDefault();
                }
            });
        }

        // Real-time validation for roll number
        const rollNumberInput = form.querySelector('input[name="rollNumber"]');
        if (rollNumberInput) {
            rollNumberInput.addEventListener('input', function() {
                const rollPattern = /^[1-9]\d*$/;
                if (this.value === '' || rollPattern.test(this.value)) {
                    this.setCustomValidity('');
                    this.classList.remove('is-invalid');
                } else {
                    this.setCustomValidity('Roll number must be a positive integer');
                    this.classList.add('is-invalid');
                }
            });
        }

        // Real-time validation for name
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                const namePattern = /^[A-Za-z\s]{2,100}$/;
                if (this.value === '' || namePattern.test(this.value)) {
                    this.setCustomValidity('');
                    this.classList.remove('is-invalid');
                } else {
                    this.setCustomValidity('Name must be 2-100 characters and contain only letters and spaces');
                    this.classList.add('is-invalid');
                }
            });
        }

        // Skills checkbox validation
        if (form.id === 'addStudentForm' || form.id === 'updateStudentForm') {
            const skillsCheckboxes = form.querySelectorAll('input[name="skills"]');
            const skillsError = form.querySelector('#skillsError');
            
            skillsCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const checkedSkills = form.querySelectorAll('input[name="skills"]:checked');
                    if (checkedSkills.length > 0 && skillsError) {
                        skillsError.style.display = 'none';
                    }
                });
            });
        }
    });

    // Pattern-based skill search validation (client-side regex preview)
    const skillPatternInput = document.querySelector('input[name="skillPattern"]');
    if (skillPatternInput) {
        skillPatternInput.addEventListener('input', function() {
            const pattern = this.value.trim();
            if (pattern) {
                try {
                    // Test if the pattern is a valid regex
                    new RegExp(pattern, 'i');
                    this.setCustomValidity('');
                    this.classList.remove('is-invalid');
                } catch (e) {
                    // Invalid regex pattern
                    this.setCustomValidity('Invalid pattern');
                    this.classList.add('is-invalid');
                }
            } else {
                this.setCustomValidity('');
                this.classList.remove('is-invalid');
            }
        });
    }

})();


