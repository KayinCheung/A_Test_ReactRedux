import React from 'react';
import Video from './index';

import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mockEntries } from '../../mock'

import rootReducer from '../../reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { MemoryRouter } from "react-router";

configure({ adapter: new Adapter() });

const middleware = [thunk]


describe('Video Component', () => {

    describe('With Movie Data', () => {
        const initialState = {
            position: {
                selectedPosition: 1,
                lastInteractPosition: 1,
                movie: mockEntries[1]
            }
        }

        const teststore = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(...middleware),
            )
        )

        const component = mount(
            <MemoryRouter initialEntries={['/video']}>
                <Video store={teststore} />
            </MemoryRouter>
        )

        //Ensure the div containing data-test='Video' is rendered once
        it('Video container should render', () => {
            const VideoComponent = component.find(`[data-test='VideoComponent']`);
            expect(VideoComponent.length).toBe(1);
        })
    })

    //If no movie data, (Eg user directly visit /video), the component will re-direct to home and return null
    describe('With NO Movie Data', () => {
        const initialState = {
            position: {
                selectedPosition: 0,
                lastInteractPosition: 0,
                movie: null
            }
        }

        const teststore = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(...middleware),
            )
        )

        const component = mount(
            <MemoryRouter initialEntries={['/video']}>
                <Video store={teststore} />
            </MemoryRouter>
        )

        //Ensure the div containing data-test='Video' not rendered
        it('Video container should NOT render', () => {
            const VideoComponent = component.find(`[data-test='VideoComponent']`);
            expect(VideoComponent.length).toBe(0);
        })
    })

});