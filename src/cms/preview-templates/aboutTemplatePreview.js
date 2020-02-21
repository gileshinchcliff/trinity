
import React from 'react';
import { AboutPageComponent } from '../../components/aboutTemplate';
import { Layout } from '../../components/layout';

const AboutPagePreview = ({ ...props }) => (
    <Layout>
        {console.log(props)}
        <AboutPageComponent
            title={props.entry.getIn(['data', 'title'])}
            body={ props.widgetFor('body') }
            cover={props.widgetFor('image')}
        />
    </Layout>
)

export default AboutPagePreview