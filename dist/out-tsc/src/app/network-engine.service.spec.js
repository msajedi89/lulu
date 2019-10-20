import { TestBed } from '@angular/core/testing';
import { NetworkEngineService } from './network-engine.service';
describe('NetworkEngineService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(NetworkEngineService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=network-engine.service.spec.js.map