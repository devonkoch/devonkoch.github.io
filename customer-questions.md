Question 1:
> Hello,
>
> I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
> - Records
> - Indexing
>
> I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."
>
> Cheers,
> George


Hi George,

A record is a schemaless, pre-indexed, pre-faceted object that contains searchable data, as JSON. Algolia developers push these records, either via drag and drop onto Algolia's Dashboard or programmatically through one of our client API libraries. Each entry in a record can ocontain an unlimited number of attributes, or JSON key/value pairs.

After pushing a data set to Algolia, developers can specify one of these key/value pairs as the Index. It's common to use an dataID: <int> format, such as 'objectID: 3842' -- an index can be any attribute or key/value pair you wish.

For setting a Custom Ranking, just like determining the index, it depends on your data set. For example, if the record is a collection of restaurant data and the user wanted to search for a place nearby, Algolia has a geo-location custom ranking, tayloring the results such that close-by restaurants appear higher in the search results.

I hoped those helped, and please let me know if you have any other questions!

Best,

Devon Koch    |   Solutions Engineer



Question 2:
> Hello,
>
> Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.
>
> Regards,
> Matt


Hi Matt,

I see how these microinteractions you've described can cause a significant delay in the overall development lifecycle in an iterative development workflow, and I sincerely apologize for any inconvience you may have experienced. You're correct -- it's never fun to hear about less than optimal customer experiences, especially since we rebuilt our new dashboard relatively recently. We truly appreciate raw and authentic customer feedback, as it allows us to iterate and hopefully create the best experiences for developers like you. If you have any other specific points of feedback or comments, we always welcome them and try to take them into consideratoin for our product roadmap.

This is crucial information that we will definitely need to take into consideration in our own product iterations. I will note this to the team who owns the Dashboard here at Algolia.

For your inconvience, I've submitted a ticket to attach 3 months of free service for your current plan.

Best,

Devon Koch | Solutions Engineer



Question 3:
> Hi,
>
> I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?
>
> Regards,
> Leo


Hi Leo,

Thank you for considering Algolia!

We strive to make integrating Algolia a seamless way to integrate an instant, custom search experience for your website or other UI. On a high level,

1) Algolia takes a JSON file either through our Dashboard UI on algolia.com or programatically through one of our API client libraries.

2) Specify an index and one or more attributes that you wish searchable and/or filterable. Algolia developers also have the option of selecting additional ranking attributes, such as displaying location-relevant results.

3) After configuring your data, you can begin building out a UI, in your case consisting of HTML (perhaps with a templating language), CSS (perhaps with a CSS preprocessor), and JavaScript for populating and manipulating the DOM to match the instant JSON.

More information on developer implementation details: https://www.algolia.com/doc/guides/

Please let me know if you have any other clarifying questions Algolia related!

Best,
Devon Koch | Solutions Engineer