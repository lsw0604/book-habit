import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  flex-shrink: 0;
`;

export default function Avatar() {
  return (
    <Container>
      <div className="image"></div>
    </Container>
  );
}

<div>
                <button type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </button>
              </div>