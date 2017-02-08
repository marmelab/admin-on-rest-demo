/* global data */
import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';

export default () => {
    const restServer = new FakeRest.FetchServer('http://localhost:3000');
    restServer.init(data);
    restServer.toggleLogging(); // logging is off by default, enable it
    fetchMock.mock('^http://localhost:3000', restServer.getHandler());
    return () => fetchMock.restore();
};
