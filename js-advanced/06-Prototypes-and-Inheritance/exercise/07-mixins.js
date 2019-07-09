function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = getQuality;
        classToExtend.prototype.isFast = isFast;
        classToExtend.prototype.isRoomy = isRoomy;

        function getQuality() {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
        }

        function isFast() {
            if (this.processorSpeed > (this.ram / 4)) {
                return true;
            } else {
                return false;
            }
        }

        function isRoomy() {
            if (this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)) {
                return true;
            } else {
                return false;
            }
        }
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = isFullSet;
        classToExtend.prototype.isClassy = isClassy;

        function isFullSet() {
            if (this.manufacturer === this.keyboard.manufacturer && this.manufacturer === this.monitor.manufacturer) {
                return true;
            } else {
                return false;
            }
        }

        function isClassy() {
            if (this.battery.expectedLife >= 3
                && (this.color === 'Silver' || this.color === 'Black')
                && this.weight < 3) {
                return true;
            } else {
                return false;
            }
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}
