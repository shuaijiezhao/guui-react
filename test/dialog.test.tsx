import {configure,  mount, ReactWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
// import renderer from 'react-test-renderer';
import GuDialog from '../lib/dialog';

configure({adapter: new Adapter()});

describe('Dialog', () => {
  let c: ReactWrapper
  beforeEach(() => {
    c = mount(
      <GuDialog visible={true}>
        <p> 这是一段文字 </p>
      </GuDialog>
    );
  })

  it('将 children 显示为内容', () => {
    expect(c.find('.content').children().html()).toEqual('<p> 这是一段文字 </p>');
  });

  it('visible 为 true 显示为内容', () => {
    expect(c.exists()).toEqual(true);
  });

  it('visible 为 false 不显示内容', () => {
    c = mount(
      <GuDialog visible={false}>
        <p> 这是一段文字 </p>
      </GuDialog>
    );
    expect(c.find('.gu-dialog').exists()).toEqual(false);
  });

  it('closable 为 true 显示关闭按钮', () => {
    expect(c.find('.gu-dialog-close').exists()).toEqual(true);
  });

  it('closable 为 false 不显示关闭按钮', () => {
    c = mount(
      <GuDialog visible={true} closable={false}>
        <p> 这是一段文字 </p>
      </GuDialog>
    );
    expect(c.find('.gu-dialog-close').exists()).toEqual(false);
  });

  it('可以接受 title', () => {
    c = mount(
      <GuDialog visible={true} title={'这是标题'}>
        <p> 这是一段文字 </p>
      </GuDialog>
    );
    expect(c.find('.gu-dialog-title').text()).toEqual('这是标题');
  });

  it('footer 为 false 不显示 footer', () => {
    c = mount(
      <GuDialog visible={true} footer={false}>
        <p> 这是一段文字 </p>
      </GuDialog>
    );
    expect(c.find('.gu-dialog-footer').exists()).toEqual(false);
  });

  it('接受confirmText 和 cancelText', () => {
    c = mount(
      <GuDialog visible={true} cancelText="取消消" confirmText="确定定">
        <p> 这是一段文字 </p>
      </GuDialog>
    );
    expect(c.find('.gu-button').first().text()).toEqual('取消消');
    expect(c.find('.gu-button').last().text()).toEqual('确定定');
  });

  it('接受 onConfirm 和 onClose', () => {
    const confirmFn = jest.fn();
    const cancelFn = jest.fn();
    c = mount(
      <GuDialog visible={true} onConfirm={confirmFn} onCancel={cancelFn}>
        <p> 这是一段文字 </p>
      </GuDialog>
    );
    c.find('.gu-button').first().simulate('click')
    expect(cancelFn.mock.calls.length).toBe(1);
    c.find('.gu-button').last().simulate('click')
    expect(confirmFn.mock.calls.length).toBe(1);
  });
});
