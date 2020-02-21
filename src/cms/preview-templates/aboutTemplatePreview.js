
import React from 'react';
import { AboutPageComponent } from '../../components/aboutTemplate';
import { Layout } from '../../components/layout';

const AboutPagePreview = ({ entry, widgetFor }) => (
    <Layout>
        <AboutPageComponent
            title={entry.getIn(['data', 'title'], null)}
            body={ widgetFor('body', null) }
            cover={entry.getIn(['data', 'cover'], null)}
        />
    </Layout>
)

export default AboutPagePreview